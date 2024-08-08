import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = 'a24be9e0b14a6ba6962d9a8707e31933'; 


  constructor(private http: HttpClient) { }

  getWeather(cityName: string): Observable<any> {
    console.log("passsing city",cityName)
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}`;

    return this.http.get(apiUrl);
  }
}
