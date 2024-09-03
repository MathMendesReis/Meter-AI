import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ListMeasureByCustomerIdUseCase } from 'src/domain/measure/application/use-case/list-measure-by-customer-id-use-case';
@ApiTags('measure')
@Controller()
export class ListMeasureByCustomerIdController {
  constructor(
    private readonly listMeasureByCustomerIdUseCase: ListMeasureByCustomerIdUseCase,
  ) {}
  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Customer code',
    example: '9bef2a92-7667-471f-91de-6052f335d45d',
  })
  async handle(@Param('id') id: string, @Res() res: Response) {
    const result = await this.listMeasureByCustomerIdUseCase.execute(id);
    return res.status(HttpStatus.OK).send(result);
  }
}
