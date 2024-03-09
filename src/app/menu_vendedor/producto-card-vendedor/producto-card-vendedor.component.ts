import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { API_PATH } from 'src/globasl';
@Component({
  selector: 'app-producto-card-vendedor',
  templateUrl: './producto-card-vendedor.component.html',
  styleUrls: ['./producto-card-vendedor.component.css'],
})
export class ProductoCardVendedorComponent implements OnInit {
  @Input() producto: any;
  @Output() eventEliminar = new EventEmitter<any>();
  @Output() eventActualizar = new EventEmitter<any>();
  pathimg: any = API_PATH;

  ngOnInit(): void {
    this.pathimg += '/' + this.producto.imagen;
  }

  public eliminar(): void {
    this.eventEliminar.emit(this.producto.id);
  }

  public editar(): void {
    this.eventActualizar.emit(this.producto.id);
  }
}
