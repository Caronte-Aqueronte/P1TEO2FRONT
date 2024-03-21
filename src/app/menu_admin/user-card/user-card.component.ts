import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent  implements OnInit {
  @Input() usuario: any;
  @Output() event = new EventEmitter<any>();

  constructor() {}
  ngOnInit(): void {}

  public eliminar(): void {
    this.event.emit(this.usuario.id);
  }
}
