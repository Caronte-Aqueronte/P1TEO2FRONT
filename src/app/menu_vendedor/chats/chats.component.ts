import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ChatService } from 'src/app/servicios/chat.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent implements OnInit {
  chats: any = [];
  constructor(
    private chatsService: ChatService,
    private cookiesService: CookieService
  ) {}
  ngOnInit(): void {
    this.listarChatsDeUnUsuario();
  }

  public listarChatsDeUnUsuario() {
    
    let id = this.cookiesService.get('id');

    this.chatsService.listarChatsDeUnUsuario(id).subscribe((res) => {
      this.chats = res.chats;
    });
  }
}
