import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(private router: Router, private cookies: CookieService) {}

  public logOut(redirect: boolean) {
    this.cookies.delete('user');
    this.cookies.delete('email');
    this.cookies.delete('id');
    if (redirect) {
      this.router.navigate(['/login']);
    }
  }
}
