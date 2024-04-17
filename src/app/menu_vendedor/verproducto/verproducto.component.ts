import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ChatService } from 'src/app/servicios/chat.service';
import { MonedaService } from 'src/app/servicios/moneda.service';
import { ProductoServiceService } from 'src/app/servicios/producto-service.service';
import { ReporteService } from 'src/app/servicios/reporte.service';
import { VentaService } from 'src/app/servicios/venta.service';
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
  contactos: Array<any> = new Array();
  usuarioRegistrado: any;
  mensajeReporte = '';
  monedasDelUsuario: any;
  mostrarContactos = false;

  constructor(
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private productoService: ProductoServiceService,
    private cookiesService: CookieService,
    private reporteService: ReporteService,
    private monedaService: MonedaService,
    private ventaService: VentaService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.initProducto();
    this.verificarSiEstaRegistrado();
  }

  cerrarModal() {
    const btnCerrarElement = document.getElementById('btnCerrar');
    if (btnCerrarElement) {
      btnCerrarElement.click();
    }
  }

  private verificarSiEstaRegistrado(): void {
    let id = this.cookiesService.get('id');
    if (id) {
      this.usuarioRegistrado = true;
    } else {
      this.usuarioRegistrado = false;
    }
  }

  public traerMonedasDelUsuario(): void {
    //usuar el servicio para enviar un nuevo articulo
    this.monedaService.traerMonedasUsuario().subscribe((respuesta: any) => {
      this.monedasDelUsuario = respuesta.cantidad_monedas;
    });
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
        this.contactos = res.producto.usuario.contactos;
        this.mostrarContactos = res.producto.mostrar_contacto;
      } else {
        alert(res.mensaje);
      }
    });
  }

  public mandarReporte() {
    this.reporteService
      .crearReporte(this.producto.id, this.mensajeReporte)
      .subscribe((res) => {
        alert(res.mensaje);
        this.mensajeReporte = '';
      });
  }

  public comprar() {
    let venta = {
      idProducto: this.producto.id,
      precioVendido: this.producto.precio,
      id: this.cookiesService.get('id'),
    };
    this.ventaService.venta(venta).subscribe((res) => {
      alert(res.mensaje);
      if (res.bandera === true) {
        this.cerrarModal();
        //nos movemos hacia ver
        this.router.navigate([`/menu_usuarios/muro_productos`]);
      }
    });
  }

  public chatear() {
    let chat = {
      Usuario1: this.cookiesService.get('id'),
      Usuario2: this.producto.usuario.id,
    };
    if (!this.usuarioRegistrado) {
      this.router.navigate([`/login`]);
      return;
    }
    this.chatService.crearChat(chat).subscribe((res) => {
      if (res.bandera === true) {
        this.router.navigate([`/menu_usuarios/chat/${res.chat.id}`]);
      } else {
        alert(res.mensaje);
      }
    });
  }

  iniciarSecion(): void {
    this.router.navigate([`/login`]);
  }
}
