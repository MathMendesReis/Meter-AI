import { Injectable } from '@nestjs/common';
import { Image } from '@prisma/client';
import { ImageRepositorie } from 'src/domain/measure/application/repositories/image-repositorie';
import { PrismaService } from '../PrismaService';
import { inputImage } from '../../interfaces/input-create-image';

@Injectable()
export class ImagePrisma implements ImageRepositorie {
  constructor(private prisma: PrismaService) {}

  async save(data: inputImage): Promise<Image> {
    return await this.prisma.image.create({
      data: data,
    });
  }
}
