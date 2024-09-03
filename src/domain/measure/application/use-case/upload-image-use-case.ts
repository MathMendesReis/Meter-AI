import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GeminiService } from 'src/domain/gemini/application/use-case/GeminiService';
import { MeasureModel } from 'src/domain/gemini/enterprise/MeasureModel';
import { MeasurePrismaRepositorie } from 'src/infra/database/prisma/repositories/MeasurePrisma';
import { FileDTO } from 'src/infra/dto/upload-request.dto';

@Injectable()
export class UploadImageUseCase {
  constructor(
    private readonly service: GeminiService,
    private readonly measurePrismaRepositorie: MeasurePrismaRepositorie,
  ) {}
  async execute(file: Express.Multer.File, body: FileDTO) {
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
