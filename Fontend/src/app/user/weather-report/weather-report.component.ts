import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.css']
})
export class WeatherReportComponent {

  city: string = '';
  weatherData: any;

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.toastr.success("Please wait a second..")
    this.route.paramMap.subscribe(params => {
      this.city = params.get('city') || '';
      if (this.city) {
        this.fetchWeather();

      }
    });
  }

  fetchWeather(): void {
    this.weatherService.getWeather(this.city).subscribe(
      data => {
        this.weatherData = data;
        this.toastr.success(`Weather in ${this.city}: ${this.weatherData.main.temp}°C`, 'Weather Report');
      },
      error => {
        console.error('Error fetching weather data:', error);
        this.toastr.error('Failed to fetch weather report.', 'Error');
      }
    );
  }

}
