import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CandidatesService } from './candidates.service';
import { diskStorage } from 'multer';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        callback(null, file.originalname);
      }
    })
  }))
  uploadFile(
    @UploadedFile() file: any,
    @Body() body: { name: string; surname: string }
  ) {
    console.log('Archivo recibido:', file);
    console.log('Nombre:', body.name, 'Apellido:', body.surname);
  
    if (!file) {
      throw new Error('No se recibió ningún archivo');
    }
    return this.candidatesService.processExcel(file.path, body.name, body.surname);
  }
}
