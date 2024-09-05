import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GeminiService } from 'src/domain/gemini/application/use-case/GeminiService';
import { MeasureModel } from 'src/domain/gemini/enterprise/MeasureModel';
import { FileDTO } from 'src/infra/dto/upload-request.dto';
import { IMeasurePrismaRepositorie } from '../repositories/measure-repositorie';
import { createClient } from '@supabase/supabase-js';
import { env } from 'src/infra/env/env';

@Injectable()
export class UploadImageUseCase {
  constructor(
    private readonly service: GeminiService,
    private readonly measurePrismaRepositorie: IMeasurePrismaRepositorie,
  ) {}
  async execute(file: Express.Multer.File, body: FileDTO) {
    const supabaseURL = env.SUPABASE.SUPABASE_URL;
    const supabaseKEY = env.SUPABASE.SUPABASE_KEY;

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

    const supabase = createClient(supabaseURL, supabaseKEY, {
      auth: {
        persistSession: false,
      },
    });

    const {
      data: { path },
    } = await supabase.storage
      .from('MeterAI')
      .upload(file.originalname, file.buffer, {
        upsert: true,
      });
    const {
      data: { publicUrl },
    } = supabase.storage.from('MeterAI').getPublicUrl(path);
    const newMeasure = new MeasureModel(
      publicUrl,
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
