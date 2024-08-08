import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor( private router: Router) {}

  canActivate(): boolean {

    const token = localStorage.getItem("usertoken")
       console.log(token)

    if (token) {
     
      return true;
    }

    
    alert("token is not available")
    this.router.navigate(['/']);  // Redirect to home or a login page
    return false;
  }
}
