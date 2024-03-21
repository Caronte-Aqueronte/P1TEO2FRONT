import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { API_PATH } from 'src/globasl';

@Component({
  selector: 'app-producto-card-reportada',
  templateUrl: './producto-card-reportada.component.html',
  styleUrls: ['./producto-card-reportada.component.css']
})
export class ProductoCardReportadaComponent implements OnInit {
  @Input() producto: any;
  @Output() verEvent = new EventEmitter<any>();
  @Output() eliminarReportesEvent = new EventEmitter<any>();
  pathimg: any = API_PATH;

  ngOnInit(): void {
    this.pathimg += '/' + this.producto.imagen;
  }

  public eliminarReportes(): void {
    this.eliminarReportesEvent.emit(this.producto.id);
  }

  public ver(): void {
    this.verEvent.emit(this.producto.id);
  }
}