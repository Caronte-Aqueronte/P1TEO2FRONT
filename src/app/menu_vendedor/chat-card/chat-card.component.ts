import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/servicios/chat.service';

@Component({
  selector: 'app-chat-card',
  templateUrl: './chat-card.component.html',
  styleUrls: ['./chat-card.component.css'],
})
export class ChatCardComponent {
  @Input() chatInfo: any;
  @Output() event = new EventEmitter<void>();
  constructor(private router: Router, private chatService: ChatService) {}

  eliminarChat() {
    this.chatService.eliminarChat(this.chatInfo.chat.id).subscribe((res) => {
      if (res.bandera) {
        alert(res.mensaje);
        this.event.emit();
      }
    });
  }
  ir() {
    this.router.navigate([`/menu_usuarios/chat/${this.chatInfo.chat.id}`]);
  }
}
