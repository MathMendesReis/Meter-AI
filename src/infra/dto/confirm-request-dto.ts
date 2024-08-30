import { IsNotEmpty } from 'class-validator';

export class ConfirmRequestDTO {
  @IsNotEmpty()
  measure_uuid: string;
  @IsNotEmpty()
  confirmed_value: number;
}
