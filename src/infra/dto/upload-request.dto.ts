import { IsNotEmpty } from 'class-validator';

export class FileDTO {
  @IsNotEmpty()
  customer_code: string;
  @IsNotEmpty()
  measure_datetime: string;
  @IsNotEmpty()
  measure_type: string;
}
