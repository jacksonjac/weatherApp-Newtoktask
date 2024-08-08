import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  private apiUrl = 'http://localhost:3000/api/';

  constructor(private http:HttpClient) {}


  getLocation(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}locations`);
  }

  parseExcel(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  
        // Extract headers
        const headers: string[] = json[0] as string[];
        // Map data rows to objects using the headers
        const dataWithoutHeader = json.slice(1).map((row:any) => {
          let obj: any = {};
          row.forEach((cell: any, index: number) => {
            obj[headers[index]] = cell;
          });
          return obj;
        });
  
        resolve(dataWithoutHeader);
      };
      reader.onerror = error => reject(error);
      reader.readAsArrayBuffer(file);
    });
  }
  addBulkLocations(locations: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}locations/bulk`, locations);
  }


  
}
