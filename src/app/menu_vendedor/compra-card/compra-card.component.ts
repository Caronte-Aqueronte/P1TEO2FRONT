import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { API_PATH } from 'src/globasl';

@Component({
  selector: 'app-compra-card',
  templateUrl: './compra-card.component.html',
  styleUrls: ['./compra-card.component.css'],
})
export class CompraCardComponent {
  @Input() compra: any;

  pathimg: any = API_PATH;

  constructor(private router: Router, private cookiesService: CookieService) {}

  ngOnInit(): void {
    this.pathimg += '/' + this.compra.imagen;
  }

  public ver(): void {
    if (this.cookiesService.get('id')) {
      //nos movemos hacia ver
      this.router.navigate([`/menu_usuarios/ver_compra/${this.compra.id}`]);
    } else {
      //nos movemos hacia ver
      this.router.navigate([`/invitado/ver_compra/${this.compra.id}`]);
    }
  }
}
