import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactoService } from 'src/app/servicios/contacto.service';

@Component({
  selector: 'app-contacto-card',
  templateUrl: './contacto-card.component.html',
  styleUrls: ['./contacto-card.component.css'],
})
export class ContactoCardComponent {
  @Input() contacto: any;
  @Output() event = new EventEmitter<void>();
  constructor(private contactoService: ContactoService) {}

  eliminarChat() {
    this.contactoService.eliminarReportes(this.contacto.id).subscribe((res) => {
      if (res.bandera) {
        this.event.emit();
      }

      alert(res.mensaje);
    });
  }
}
