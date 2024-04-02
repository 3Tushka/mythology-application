import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';

@Controller('images')
export class ImagesController {
  @Get(':imagePath')
  serveImage(@Res() res: Response, @Param('imagePath') imagePath: string) {
    const imageFile = path.resolve(__dirname, '../static', imagePath);
    return res.sendFile(imageFile);
  }
}
