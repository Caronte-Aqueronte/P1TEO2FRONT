import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router:Router){

  }

  ngOnInit(): void {
    this.pathimg += '/' + this.producto.imagen;
  }

  public ver(): void {
    //nos movemos hacia ver
    this.router.navigate([`/menu_usuarios/ver_producto/${this.producto.id}`]);
  }
}
