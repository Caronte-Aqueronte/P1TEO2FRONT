import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ChatService } from 'src/app/servicios/chat.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
})
export class ChatPageComponent implements OnInit {
  @ViewChild('chatMessages') chatMessagesRef!: ElementRef;

  chatId = '';
  destinatario: any;
  messages: any = [];
  newMessage: string = '';

  constructor(
    private chatService: ChatService,
    private activatedRoute: ActivatedRoute,
    private cookiesService: CookieService
  ) {}

  ngOnInit(): void {
    this.chatId = this.activatedRoute.snapshot.params['id']; //obtenemos el id d los parametros que nos envian
    this.listarMensajesDeUnChat();
    this.obtenerNombresUsuariosChat();
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }
  private obtenerNombresUsuariosChat() {
    this.chatService
      .obtenerNombresUsuariosChat(this.chatId)
      .subscribe((res) => {
        if (res.bandera === true) {
          const participantes = res.participantes;
          const usuarioLogeadoId = parseInt(this.cookiesService.get('id'), 10); // Convertir a número
  
          // Encuentra el participante que no sea el usuario logeado
          const destinatario = participantes.find((participante: any) => participante.id !== usuarioLogeadoId);
  
          if (destinatario) {
            // Cargar el nombreUsuario del destinatario en la variable destinatario
            this.destinatario = destinatario.nombreUsuario;
          } else {
            console.log("No se encontró un destinatario diferente al usuario logeado.");
          }
        } else {
          console.log("Error al obtener los nombres de usuario del chat.");
        }
      });
  }
  
  private cargarMensaje(mensajes: any) {
    for (let mensaje of mensajes) {
      var carga = {
        contenido: mensaje.contenido,
        UserId: mensaje.UserId,
        fecha: mensaje.createdAt,
      };

      this.cargar(carga);
    }
  }

  private cargar(mensaje: any) {
    let idUser = parseInt(this.cookiesService.get('id'), 10); // Convertir a número
    let isUserMessage = true;

    if (idUser === mensaje.UserId) {
      isUserMessage = true;
    } else {
      isUserMessage = false;
    }

    this.messages.push({
      text: mensaje.contenido,
      isUserMessage: isUserMessage,
      fecha: mensaje.fecha,
    });
    setTimeout(() => {
      this.scrollToBottom();
    });
  }

  public listarMensajesDeUnChat() {
    this.chatService.listarMensajesDeUnChat(this.chatId).subscribe((res) => {
      console.log(res);
      if (res.bandera === true) {
        this.cargarMensaje(res.mensajes);
      } else {
        alert(res.mensaje);
      }
    });
  }

  public crearMensaje() {
    let mensaje = {
      chatId: this.chatId,
      contenido: this.newMessage.trim(),
      UserId: parseInt(this.cookiesService.get('id'), 10),
    };

    this.chatService.crearMensaje(mensaje).subscribe((res) => {
      if (res.bandera === true) {
        this.cargarMensaje([res.mensaje]);
        this.newMessage = '';
      } else {
        alert(res.mensaje);
      }
    });
  }

  private scrollToBottom() {
    try {
      this.chatMessagesRef.nativeElement.scrollTop =
        this.chatMessagesRef.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error al desplazarse hacia abajo:', err);
    }
  }
}
