import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar-vendedor',
  templateUrl: './nav-bar-vendedor.component.html',
  styleUrls: ['./nav-bar-vendedor.component.css'],
})
export class NavBarVendedorComponent implements OnInit {
  public nombreUsuario: String = '';
  constructor(private cookiesService: CookieService) {}
  ngOnInit(): void {
    let nombre_usuario = this.cookiesService.get("user");
    this.nombreUsuario = nombre_usuario;
  }
}
