import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { API_PATH } from 'src/globasl';

@Component({
  selector: 'app-producto-card-aprovacion',
  templateUrl: './producto-card-aprovacion.component.html',
  styleUrls: ['./producto-card-aprovacion.component.css']
})
export class ProductoCardAprovacionComponent implements OnInit {
  @Input() producto: any;
  @Output() eventAceptar= new EventEmitter<any>();
  @Output() eventRechazar = new EventEmitter<any>();
  pathimg: any = API_PATH;

  constructor(private router:Router){

  }

  ngOnInit(): void {
    this.pathimg += '/' + this.producto.imagen;
  }

  public rechazar(): void {
    this.eventRechazar.emit(this.producto.id);
  }

  public aceptar(): void {
    this.eventAceptar.emit(this.producto.id);
  }

  public redirigir(){
    this.router.navigate([`/menu_admin/ver_producto/${this.producto.id}`]);
  }
}
