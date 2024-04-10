import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ChatService } from 'src/app/servicios/chat.service';
import { CompraService } from 'src/app/servicios/compra.service';
import { API_PATH } from 'src/globasl';

@Component({
  selector: 'app-ver-compra',
  templateUrl: './ver-compra.component.html',
  styleUrls: ['./ver-compra.component.css'],
})
export class VerCompraComponent implements OnInit {
  producto: any;
  pathimg: any = API_PATH;
  usuarioVendedor: any;
  tags: Array<any> = new Array();
  usuarioRegistrado: any;
  mensajeReporte = '';
  monedasDelUsuario: any;

  constructor(
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private compraService: CompraService,
    private cookiesService: CookieService,
    private chatService: ChatService
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
    const idProd = this.rutaActiva.snapshot.params['id']; //obtenemos el id d los parametros que nos envian
    this.mostrarInfoDeLaCompra(idProd);
  }

  private mostrarInfoDeLaCompra(id: any): void {
    this.compraService.traerCompraPorId(id).subscribe((res) => {
      if (res.bandera === true) {
        console.log(res);
        this.pathimg += '/' + res.compra.imagen;
        this.producto = res.compra;
        this.usuarioVendedor = res.compra.usuario;
        this.tags = res.compra.tags;
      } else {
        alert(res.mensaje);
      }
    });
  }

  public chatear() {
    let chat = {
      Usuario1: this.cookiesService.get('id'),
      Usuario2: this.producto.usuario.id,
    };

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
