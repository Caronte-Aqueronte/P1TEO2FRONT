import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { API_PATH } from 'src/globasl';

@Component({
  selector: 'app-producto-card-vendido',
  templateUrl: './producto-card-vendido.component.html',
  styleUrls: ['./producto-card-vendido.component.css']
})
export class ProductoCardVendidoComponent implements OnInit {
  @Input() producto: any;
  @Output() eventEliminar = new EventEmitter<any>();
  @Output() eventActualizar = new EventEmitter<any>();
  pathimg: any = API_PATH;

  ngOnInit(): void {
    this.pathimg += '/' + this.producto.imagen;
  }

}
