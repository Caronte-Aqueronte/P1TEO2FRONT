import { Component, OnInit } from '@angular/core';
import { ProductoServiceService } from 'src/app/servicios/producto-service.service';
import { ReporteService } from 'src/app/servicios/reporte.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-administrar-post',
  templateUrl: './administrar-post.component.html',
  styleUrls: ['./administrar-post.component.css'],
})
export class AdministrarPostComponent implements OnInit {
  nombreUsuario = '';
  solicitudes: any = [];
  reportes: any = [];
  usuarios: any = [];

  constructor(private productoService: ProductoServiceService,
    private reportesService:ReporteService) {}

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


  public eliminarReportes(id: any) {
    this.reportesService.eliminarReportes(id).subscribe((res) => {
      alert(res.mensaje);
      if (res.bandera) {
        this.traerReportes();
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
    this.productoService.mostrarProductosReportados().subscribe((res) => {
      console.log(res)
      this.reportes = res;
    });
  }
}
