import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfirmRequestDTO } from 'src/infra/dto/confirm-request-dto';
import { IMeasurePrismaRepositorie } from '../repositories/measure-repositorie';

@Injectable()
export class ConfirmedValeuMeasureUseCase {
  constructor(
    private readonly measurePrismaRepositorie: IMeasurePrismaRepositorie,
  ) {}
  async execute(body: ConfirmRequestDTO): Promise<
    | {
        sucess: boolean;
      }
    | HttpException
  > {
    const measurementExists =
      await this.measurePrismaRepositorie.findUniqueById(body.measure_uuid);
    if (!measurementExists) {
      throw new HttpException('MEASURE_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    if (measurementExists.hasConfirmed === true) {
      throw new HttpException('CONFIRMATION_DUPLICATE', HttpStatus.CONFLICT);
    }

    await this.measurePrismaRepositorie.updateMeasureHasConfirmedToTrue(
      measurementExists.id,
      body.confirmed_value === 0 ? true : false,
    );
    return {
      sucess: true,
    };
  }
}
