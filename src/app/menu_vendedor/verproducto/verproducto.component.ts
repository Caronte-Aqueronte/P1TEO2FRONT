import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ProductoServiceService } from 'src/app/servicios/producto-service.service';
import { ReporteService } from 'src/app/servicios/reporte.service';
import { API_PATH } from 'src/globasl';

@Component({
  selector: 'app-verproducto',
  templateUrl: './verproducto.component.html',
  styleUrls: ['./verproducto.component.css'],
})
export class VerproductoComponent implements OnInit {
  producto: any;
  pathimg: any = API_PATH;
  usuarioVendedor: any;
  tags: Array<any> = new Array();
  usuarioRegistrado: any;
  mensajeReporte = '';
  constructor(
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private productoService: ProductoServiceService,
    private cookiesService: CookieService,
    private reporteService: ReporteService
  ) {}

  ngOnInit(): void {
    this.initProducto();
    this.verificarSiEstaRegistrado();
  }

  private verificarSiEstaRegistrado(): void {
    let id = this.cookiesService.get('id');
    if (id) {
      this.usuarioRegistrado = true;
    } else {
      this.usuarioRegistrado = false;
    }
  }

  private initProducto(): void {
    const idProd = this.rutaActiva.snapshot.params['idProd']; //obtenemos el id d los parametros que nos envian
    this.mostrarInfoDelProducto(idProd);
  }

  private mostrarInfoDelProducto(id: any): void {
    this.productoService.traerProductoPorId(id).subscribe((res) => {
      if (res.bandera === true) {
        console.log(res);
        this.pathimg += '/' + res.producto.imagen;
        this.producto = res.producto;
        this.usuarioVendedor = res.producto.usuario;
        this.tags = res.producto.tags;
      } else {
        alert(res.mensaje);
      }
    });
  }

  public mandarReporte() {
    console.log(this.mensajeReporte)
    this.reporteService
      .crearReporte(this.producto.id, this.mensajeReporte)
      .subscribe((res) => {
        alert(res.mensaje);
        this.mensajeReporte = '';
      });
  }
}
