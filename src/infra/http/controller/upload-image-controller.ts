import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileDTO } from 'src/infra/dto/upload-request.dto';
import { GeminiService } from 'src/domain/gemini/application/use-case/GeminiService';
import { MeasureModel } from 'src/domain/gemini/enterprise/MeasureModel';
import { MeasurePrismaRepositorie } from 'src/infra/database/prisma/repositories/MeasurePrisma';
@ApiTags('Gemini')
@Controller('gemini')
export class UploadImageController {
  constructor(
    private readonly service: GeminiService,
    private readonly measurePrismaRepositorie: MeasurePrismaRepositorie,
  ) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        customer_code: {
          type: 'string',
          description: 'uuid',
          example: '9bef2a92-7667-471f-91de-6052f335d45d',
        },
        measure_datetime: {
          type: 'string',
          description: 'datetime',
          example: '2024-06-31',
        },
        measure_type: {
          type: 'string',
          description: '"WATER" ou "GAS"',
          example: 'WATER',
        },

        file: {
          type: 'string',
          format: 'binary',
          description: 'Binary file',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './uploads',
    }),
  )
  async handle(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: FileDTO,
  ) {
    const year = body.measure_datetime.split('-')[0];
    const month = body.measure_datetime.split('-')[1];
    const day = body.measure_datetime.split('-')[2];
    const date = new Date(`${year}-${month}-${day}`);
    const monthYear = date.toISOString().slice(0, 7);
    const isMeasureExists =
      await this.measurePrismaRepositorie.findUnique(monthYear);

    if (isMeasureExists) {
      throw new HttpException(
        'Leitura do mês já realizada',
        HttpStatus.CONFLICT,
      );
    }

    const analizToImage = await this.service.uploadImage(file);

    const newMeasure = new MeasureModel(
      '',
      body.customer_code,
      body.measure_type,
      analizToImage.toString(),
      new Date(),
      monthYear,
    );
    return await this.measurePrismaRepositorie.createCustomer(newMeasure);
  }
}
