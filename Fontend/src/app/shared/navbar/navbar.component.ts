import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}
    
  isLoggedIn(): boolean {
    const token = localStorage.getItem("adminToken");
    return !!token;
  }

  logout(): void {
   this.authService.clearAuthToken()
  }



}
