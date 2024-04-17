import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ChatService } from 'src/app/servicios/chat.service';
import { VoluntariadoService } from 'src/app/servicios/voluntariado.service';

@Component({
  selector: 'app-ver-voluntariado',
  templateUrl: './ver-voluntariado.component.html',
  styleUrls: ['./ver-voluntariado.component.css'],
})
export class VerVoluntariadoComponent implements OnInit {
  producto: any;
  usuarioVendedor: any;
  contactos: Array<any> = new Array();
  mostrarContactos = false;

  constructor(
    private router: Router,
    private rutaActiva: ActivatedRoute,
    private volService: VoluntariadoService,
    private cookiesService: CookieService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.initProducto();
  }

  private initProducto(): void {
    const idProd = this.rutaActiva.snapshot.params['id']; //obtenemos el id d los parametros que nos envian
    this.mostrarInfoDelVol(idProd);
  }
  participar() {
    let vol = {
      idVoluntariado: this.producto.id,
      idUsuario: this.cookiesService.get('id'),
    };
    this.volService.participar(vol).subscribe((res) => {
      alert(res.mensaje);
      if (res.bandera === true) {
        this.router.navigate([`/menu_usuarios/voluntariados`]);
      }
    });
  }

  private mostrarInfoDelVol(id: any): void {
    this.volService.traerVoluntariadoPorId(id).subscribe((res) => {
      if (res.bandera === true) {
        console.log(res);
        this.producto = res.vol;
        this.usuarioVendedor = res.vol.usuario;
        this.contactos = res.vol.usuario.contactos;
        this.mostrarContactos = res.vol.mostrar_contacto;
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
}
