import { Body, Controller, HttpStatus, Patch, Res } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ConfirmRequestDTO } from 'src/infra/dto/confirm-request-dto';
import { ConfirmedValeuMeasureUseCase } from 'src/domain/measure/application/use-case/confirmed-valeu-measure-use-case';
import { Response } from 'express';

@ApiTags('measure')
@Controller()
export class ConfirmedValueMeasureController {
  constructor(
    private readonly confirmedValeuMeasureUseCase: ConfirmedValeuMeasureUseCase,
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
  async handle(@Res() res: Response, @Body() body: ConfirmRequestDTO) {
    await this.confirmedValeuMeasureUseCase.execute(body);
    return res.status(HttpStatus.CREATED).send({ sucess: true });
  }
}
