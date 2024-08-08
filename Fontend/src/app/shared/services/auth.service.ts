import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  generateAdminToken() {
    const token = 'adminToken123';
    localStorage.setItem("admintoken", token);
  }

  generateUserToken() {
    const token = 'userToken123';
    localStorage.setItem("usertoken", token);
  }

  clearAuthToken() {
    const adminToken = localStorage.getItem('adminToken123');
    const userToken = localStorage.getItem("usertoken");
    
    if (adminToken) {
      localStorage.removeItem('adminToken123');
      console.log('Admin token cleared');
      this.router.navigate(['/admin']); 
    } else if (userToken) {
      localStorage.removeItem("usertoken");
      console.log('User token cleared');
      this.router.navigate(['/user']); 
    }
  }

  clearUserToken() {
    localStorage.removeItem("usertoken")
    console.log("clear token funtion")
    this.router.navigate(['/user']);


  }


}
