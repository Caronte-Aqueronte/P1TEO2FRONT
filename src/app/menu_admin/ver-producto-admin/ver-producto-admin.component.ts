import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoServiceService } from 'src/app/servicios/producto-service.service';
import { ReporteService } from 'src/app/servicios/reporte.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { API_PATH } from 'src/globasl';

@Component({
  selector: 'app-ver-producto-admin',
  templateUrl: './ver-producto-admin.component.html',
  styleUrls: ['./ver-producto-admin.component.css'],
})
export class VerProductoAdminComponent implements OnInit {
  producto: any;
  pathimg: any = API_PATH;
  usuarioVendedor: any;
  tags: Array<any> = new Array();
  reportes: Array<any> = new Array();
  mensajeReporte = '';

  constructor(
    private rutaActiva: ActivatedRoute,
    private productoService: ProductoServiceService,
    private reportesService: ReporteService,
    private usuarioServie:UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initProducto();
  }

  private initProducto(): void {
    const idProd = this.rutaActiva.snapshot.params['idProd']; //obtenemos el id d los parametros que nos envian
    this.mostrarInfoDelProducto(idProd);
  }

  public eliminarReportes() {
    this.reportesService.eliminarReportes(this.producto.id).subscribe((res) => {
      alert(res.mensaje);
      if (res.bandera) {
        this.redirect();
      }
    });
  }

  public eliminarPublicacion() {
    this.productoService.eliminarProducto(this.producto.id).subscribe((res) => {
      alert(res.mensaje);
      if (res.bandera) {
        this.redirect();
      }
    });
  }

  public eliminarUsuario() {
    this.usuarioServie.eliminarUsuarioPorId(this.producto.usuario.id).subscribe((res) => {
      alert(res.mensaje);
      if (res.bandera) {
        this.redirect();
      }
    });
  }

  private mostrarInfoDelProducto(id: any): void {
    this.productoService.traerProductoPorId(id).subscribe((res) => {
      if (res.bandera === true) {
        console.log(res);
        this.pathimg += '/' + res.producto.imagen;
        this.producto = res.producto;
        this.usuarioVendedor = res.producto.usuario;
        this.tags = res.producto.tags;
        this.reportes = this.producto.reportes;
      } else {
        alert(res.mensaje);
      }
    });
  }

  private redirect() {
    this.router.navigate([`/menu_admin/administrar_post`]);
  }
}
