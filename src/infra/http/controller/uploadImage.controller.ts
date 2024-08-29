import { Controller, Post } from '@nestjs/common';

@Controller()
export class UploadImageController {
  @Post()
  async handle() {
    return 'Hello World!';
  }
}
