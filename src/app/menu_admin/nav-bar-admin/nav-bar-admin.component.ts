import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar-admin',
  templateUrl: './nav-bar-admin.component.html',
  styleUrls: ['./nav-bar-admin.component.css']
})
export class NavBarAdminComponent implements OnInit {
  public nombreUsuario: String = '';
  constructor(private cookiesService: CookieService) {}
  ngOnInit(): void {
    let nombre_usuario = this.cookiesService.get("user");
    this.nombreUsuario = nombre_usuario;
  }
}