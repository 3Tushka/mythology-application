import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { ImagesController } from './files.controller';

@Module({
  providers: [FilesService],
  exports: [FilesService],
  controllers: [ImagesController],
})
export class FilesModule {}
