import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ListMeasureByCustomerIdUseCase } from 'src/domain/measure/application/use-case/list-measure-by-customer-id-use-case';
@ApiTags('measure')
@Controller()
export class ListMeasureByCustomerIdController {
  constructor(
    private readonly listMeasureByCustomerIdUseCase: ListMeasureByCustomerIdUseCase,
  ) {}
  @Get('list/:customer_code')
  @ApiQuery({
    name: 'measure_type',
    required: false,
    description: 'Measure type: "WATER" or "GAS"',
  })
  async handle(
    @Param('customer_code') customer_code: string,
    @Query('measure_type') measureType: string,

    @Res() res: Response,
  ) {
    const result = await this.listMeasureByCustomerIdUseCase.execute(
      customer_code,
      measureType,
    );
    return res.status(HttpStatus.OK).send(result);
  }
}
