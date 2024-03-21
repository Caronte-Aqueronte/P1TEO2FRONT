import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-card-solicitud',
  templateUrl: './user-card-solicitud.component.html',
  styleUrls: ['./user-card-solicitud.component.css']
})
export class UserCardSolicitudComponent implements OnInit {
  @Input() usuario: any;
  @Output() event = new EventEmitter<any>();

  constructor() {}
  ngOnInit(): void {}

  public aceptar(): void {
    this.event.emit(this.usuario.id);
  }
}
