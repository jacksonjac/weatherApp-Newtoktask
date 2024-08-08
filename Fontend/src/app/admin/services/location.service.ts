import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  addLocation(location: any): Observable<any> {
    return this.http.post(`${this.apiUrl}locations/add`, location);
  }

  getLocations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
