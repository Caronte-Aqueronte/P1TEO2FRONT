import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav-bar-comprador',
  templateUrl: './nav-bar-comprador.component.html',
  styleUrls: ['./nav-bar-comprador.component.css'],
})
export class NavBarCompradorComponent implements OnInit {
  public nombreUsuario: String = '';
  constructor(private cookiesService: CookieService) {}
  ngOnInit(): void {
    let nombre_usuario = this.cookiesService.get('user');
    this.nombreUsuario = nombre_usuario;
  }
}
