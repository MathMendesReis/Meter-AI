import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GeminiService } from 'src/domain/gemini/application/use-case/GeminiService';
import { MeasureModel } from 'src/domain/gemini/enterprise/MeasureModel';
import { FileDTO } from 'src/infra/dto/upload-request.dto';
import { IMeasurePrismaRepositorie } from '../repositories/measure-repositorie';
import { ImageRepositorie } from '../repositories/image-repositorie';
import { ImageModel } from 'src/domain/gemini/enterprise/ImageModel';
@Injectable()
export class UploadImageUseCase {
  constructor(
    private readonly service: GeminiService,
    private readonly measurePrismaRepositorie: IMeasurePrismaRepositorie,
    private readonly imageRepositorie: ImageRepositorie,
  ) {}
  async execute(
    file: Express.Multer.File,
    body: FileDTO,
    protocol: string,
    host: string,
  ) {
    const year = body.measure_datetime.split('-')[0];
    const month = body.measure_datetime.split('-')[1];
    const day = body.measure_datetime.split('-')[2];
    const date = new Date(`${year}-${month}-${day}`);
    const monthYear = date.toISOString().slice(0, 7);
    const isMeasureExists = await this.measurePrismaRepositorie.findUnique(
      monthYear,
      body.customer_code,
    );
    if (isMeasureExists) {
      throw new HttpException(
        'Leitura do mês já realizada',
        HttpStatus.CONFLICT,
      );
    }

    const analizToImage = await this.service.uploadImage(file);

    const newImage = new ImageModel();
    newImage.setFilename(file.filename);
    newImage.setContentLength(file.size.toString());
    newImage.setContentType(file.mimetype);
    newImage.setUrl(`${protocol}://${host}/files/${file.filename}`);

    const imageDB = await this.imageRepositorie.save({
      contentLength: newImage.getContentLength(),
      contentType: newImage.getContentType(),
      fileName: newImage.getFilename(),
      url: newImage.getUrl(),
    });

    const newMeasure = new MeasureModel(
      imageDB.url,
      body.customer_code,
      body.measure_type,
      String(analizToImage),
      new Date(),
      monthYear,
    );
    const { image, measureValue, id } =
      await this.measurePrismaRepositorie.createCustomer(newMeasure);

    return {
      image_url: image,
      measure_value: measureValue,
      measure_uuid: id,
    };
  }
}
