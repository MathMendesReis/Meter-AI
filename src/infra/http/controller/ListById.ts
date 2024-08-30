import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { MeasurePrismaRepositorie } from 'src/infra/database/prisma/repositories/MeasurePrisma';
@ApiTags('measure')
@Controller()
export class ListById {
  constructor(
    private readonly measurePrismaRepositorie: MeasurePrismaRepositorie,
  ) {}
  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Customer code',
    example: '9bef2a92-7667-471f-91de-6052f335d45d',
  })
  async handle(@Param('id') id: string) {
    const findAll = await this.measurePrismaRepositorie.findAll(id);

    if (findAll.length === 0) {
      throw new HttpException(
        {
          error_code: 'MEASURES_NOT_FOUND',
          error_description: 'Nenhuma leitura',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const transformedData = findAll.map((item) => ({
      measure_uuid: item.id,
      measure_datetime: item.measureDatetime,
      measure_type: item.measureType,
      has_confirmed: item.hasConfirmed,
      image_url: item.image,
    }));

    return {
      customer_code: id,
      measures: transformedData,
    };
  }
}
