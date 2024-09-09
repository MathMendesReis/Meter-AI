import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileDTO } from 'src/infra/dto/upload-request.dto';
import { UploadImageUseCase } from 'src/domain/measure/application/use-case/upload-image-use-case';
import { Response } from 'express';
import { Request } from 'express';
import multerConfig from 'src/infra/utils/multer-config';
import parseFilePipe from 'src/infra/utils/parse-file-pipe';

@ApiTags('measure')
@Controller('save')
export class UploadImageController {
  constructor(private readonly uploadImageUseCase: UploadImageUseCase) {}

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
          description: 'image',
        },
      },
    },
  })
  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async handle(
    @Res() res: Response,
    @Req() req: Request,
    @UploadedFile(parseFilePipe)
    file: Express.Multer.File,
    @Body() body: FileDTO,
  ) {
    const result = await this.uploadImageUseCase.execute(
      file,
      body,
      req.protocol,
      req.get('host'),
    );
    return res.status(HttpStatus.CREATED).send(result);
  }
}
