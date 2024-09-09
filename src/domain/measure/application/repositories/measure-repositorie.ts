import { Measure } from '@prisma/client';
import { MeasureModel } from 'src/domain/gemini/enterprise/MeasureModel';

export abstract class IMeasurePrismaRepositorie {
  abstract createCustomer(body: MeasureModel): Promise<Measure>;
  abstract findUnique(
    monthYear: string,
    customerId: string,
  ): Promise<Measure | null>;
  abstract findUniqueById(id: string): Promise<Measure | null>;
  abstract updateMeasureHasConfirmedToTrue(
    id: string,
    hasConfirmed: boolean,
  ): Promise<Measure>;
  abstract findAll(
    customerId: string,
    measure_type?: string,
  ): Promise<Measure[]>;
}
