import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {

    const token = localStorage.getItem("admintoken")
       console.log(token)

    if (token) {
     
      return true;
    }

    
    alert("token is not available")
    this.router.navigate(['/']);  
    return false;
  }
}