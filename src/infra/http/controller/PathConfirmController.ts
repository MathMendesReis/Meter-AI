import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ConfirmRequestDTO } from 'src/infra/dto/confirm-request-dto';
import { MeasurePrismaRepositorie } from 'src/infra/database/prisma/repositories/MeasurePrisma';

@ApiTags('measure')
@Controller()
export class PacthConfirmController {
  constructor(
    private readonly measurePrismaRepositorie: MeasurePrismaRepositorie,
  ) {}
  @Patch('confirm')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        measure_uuid: {
          type: 'string',
          description: 'id of a measurement',
          example: '9bef2a92-7667-471f-91de-6052f335d45d',
        },
        confirmed_value: {
          type: 'number',
          description: '0 = true / 1 = false',
          example: '0',
        },
      },
    },
  })
  async handle(@Body() body: ConfirmRequestDTO) {
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
      success: true,
    };
  }
}
