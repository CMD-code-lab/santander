import { Injectable } from '@nestjs/common';
import * as xlsx from 'xlsx';
import * as fs from 'fs';

@Injectable()
export class CandidatesService {
  processExcel(filePath: string, name: string, surname: string) {
    try {
      const workbook = xlsx.readFile(filePath);
      const firstSheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[firstSheetName];
      const jsonData = xlsx.utils.sheet_to_json(sheet, { defval: null });

      if (jsonData.length === 0) {
        throw new Error('El archivo Excel no contiene datos válidos');
      }

      const candidateData: any = jsonData[0];

      // Eliminamos el archivo después de procesarlo
      fs.unlinkSync(filePath);

      return {
        name,
        surname,
        seniority: candidateData.seniority,
        years: candidateData.years,
        availability: candidateData.availability,
      };
    } catch (error) {
      throw new Error('No se pudo procesar el archivo');
    }
  }
  
}
