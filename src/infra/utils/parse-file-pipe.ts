import { FileTypeValidator, ParseFilePipe } from '@nestjs/common';

const parseFilePipe = new ParseFilePipe({
  validators: [
    new FileTypeValidator({
      fileType: '.(png|jpg|jpeg|pdf)',
    }),
  ],
});

export default parseFilePipe;
