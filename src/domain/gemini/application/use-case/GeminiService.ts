import { Injectable } from '@nestjs/common';
import { fileManager, model } from '../constants/GeminiConsts';

@Injectable()
export class GeminiService {
  async uploadImage(file: Express.Multer.File) {
    const prompt =
      'Extract the numeric value displayed on the meter, return only that value';
    const uploadResult = await fileManager.uploadFile(`${file.path}`, {
      mimeType: file.mimetype,
      displayName: file.originalname,
    });
    const result = await model.generateContent([
      prompt,
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: uploadResult.file.mimeType,
        },
      },
    ]);
    return Number(result.response.text());
  }
}
