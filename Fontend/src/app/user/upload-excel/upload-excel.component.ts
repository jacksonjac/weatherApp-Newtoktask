import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/user/services/excel.service';
import { WeatherService } from 'src/app/user/services/weather.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload-excel',
  templateUrl: './upload-excel.component.html',
  styleUrls: ['./upload-excel.component.css'],
})
export class UploadExcelComponent implements OnInit {
  file: File | undefined;
  locations: any[] = [];
  constructor(
    private excelService: ExcelService,
    private weatherService: WeatherService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchLocations();
  }

  onFileChange(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.file = selectedFile;
    } else {
      console.error('No file selected.');
    }
  }

  uploadFile() {
    if (!this.file) {
      console.error('No file to upload.');
      return;
    }

    this.excelService
      .parseExcel(this.file)
      .then((data) => {

        this.excelService.addBulkLocations(data).subscribe(
          (response) => {
            console.log('Bulk data uploaded successfully:', response);
            if (response.status) {
              this.toastr.success('Data uploaded successfully!', 'Success');
              this.fetchLocations();
            } else {
              this.toastr.error(response.message, 'Error');
            }
          },
          (error) => {
            console.error('Error uploading bulk data:', error);
            this.toastr.error('Error uploading bulk data.', 'Error');
          }
        );
      })
      .catch((error) => {
        console.error('Error parsing Excel file:', error);
        this.toastr.error('Error parsing Excel file.', 'Error');
      });
  }

  fetchLocations() {
    this.excelService.getLocation().subscribe(
      (data) => {
        console.log('responce data ', data);
        this.locations = data;
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );
  }
  
  viewReport(location: any): void {
    this.router.navigate(['weather-report', location.city]);
  }
}
