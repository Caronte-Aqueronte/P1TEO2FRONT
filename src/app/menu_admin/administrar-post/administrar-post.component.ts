import { Component, OnInit } from '@angular/core';
import { ProductoServiceService } from 'src/app/servicios/producto-service.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-administrar-post',
  templateUrl: './administrar-post.component.html',
  styleUrls: ['./administrar-post.component.css'],
})
export class AdministrarPostComponent implements OnInit {
  nombreUsuario = '';
  solicitudes: any = [];
  usuarios: any = [];

  constructor(private productoService: ProductoServiceService) {}

  ngOnInit(): void {
    this.traerSolicitudes();
    this.traerReportes();
  }

  public rechazarPublicacion(id: any) {
    this.productoService.rechazarProducto(id).subscribe((res) => {
      alert(res.mensaje);
      if (res.bandera) {
        this.traerSolicitudes();
      }
    });
  }

  public aceptarPublicacion(id: any) {
    this.productoService.aceptarProducto(id).subscribe((res) => {
      alert(res.mensaje);
      if (res.bandera) {
        this.traerSolicitudes();
      }
    });
  }

  public verPublicacion(id: any) {}

  public traerSolicitudes() {
    this.productoService.traerSolicitudesDeAprovacion().subscribe((res) => {
      this.solicitudes = res.productos;
    });
  }

  public traerReportes() {
    this.productoService.traerSolicitudesDeAprovacion().subscribe((res) => {
      this.solicitudes = res;
    });
  }
}
