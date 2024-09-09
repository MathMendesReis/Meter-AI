import { Image } from '@prisma/client';
import { inputImage } from 'src/infra/database/interfaces/input-create-image';

export abstract class ImageRepositorie {
  abstract save(data: inputImage): Promise<Image>;
}
