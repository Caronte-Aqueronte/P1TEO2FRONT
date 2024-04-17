import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { API_PATH } from 'src/globasl';

@Component({
  selector: 'app-card-producto-compra',
  templateUrl: './card-producto-compra.component.html',
  styleUrls: ['./card-producto-compra.component.css'],
})
export class CardProductoCompraComponent implements OnInit {
  @Input() producto: any;
  @Output() eventVer = new EventEmitter<any>();
  pathimg: any = API_PATH;

  constructor(private router: Router, private cookiesService: CookieService) {}

  ngOnInit(): void {
    this.pathimg += '/' + this.producto.imagen;
  }

  public ver(): void {
    if (this.cookiesService.get('id')) {
      //nos movemos hacia ver
      this.router.navigate([`/menu_usuarios/ver_producto/${this.producto.id}`]);
    } else {
      //nos movemos hacia ver
      this.router.navigate([`/invitado/ver_producto/${this.producto.id}`]);
    }
  }
}
