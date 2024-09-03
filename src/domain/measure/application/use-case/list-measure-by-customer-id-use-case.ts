import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IMeasurePrismaRepositorie } from '../repositories/measure-repositorie';
@Injectable()
export class ListMeasureByCustomerIdUseCase {
  constructor(
    private readonly measurePrismaRepositorie: IMeasurePrismaRepositorie,
  ) {}

  async execute(id: string) {
    const findAll = await this.measurePrismaRepositorie.findAll(id);
    this.measureNotFound(findAll);
    const transformedData = this.transformedData(findAll);
    return {
      customer_code: id,
      measures: transformedData,
    };
  }

  measureNotFound(array: any[]) {
    if (array.length === 0) {
      throw new HttpException(
        {
          error_code: 'MEASURES_NOT_FOUND',
          error_description: 'Nenhuma leitura',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  transformedData(array: any[]) {
    return array.map((item) => ({
      measure_uuid: item.id,
      measure_datetime: item.measureDatetime,
      measure_type: item.measureType,
      has_confirmed: item.hasConfirmed,
      image_url: item.image,
    }));
  }
}
