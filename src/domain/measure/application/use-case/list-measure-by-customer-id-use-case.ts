import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IMeasurePrismaRepositorie } from '../repositories/measure-repositorie';
@Injectable()
export class ListMeasureByCustomerIdUseCase {
  constructor(
    private readonly measurePrismaRepositorie: IMeasurePrismaRepositorie,
  ) {}

  async execute(customer_code: string, measure_type?: string) {
    const measureType = this.validateMeasureType(measure_type);
    const findAll = await this.measurePrismaRepositorie.findAll(
      customer_code,
      measureType,
    );
    this.measureNotFound(findAll);
    const transformedData = this.transformedData(findAll);
    return {
      customer_code: findAll[0].customerId,
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

  private validateMeasureType(measure_type?: string) {
    if (measure_type !== undefined) {
      const validTypes = ['water', 'gas'];
      if (!validTypes.includes(measure_type.toLowerCase())) {
        throw new HttpException(
          {
            error_code: 'INVALID_TYPE',
            error_description: 'Tipo de medição não permitida',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      return measure_type.toUpperCase();
    }
  }
}
