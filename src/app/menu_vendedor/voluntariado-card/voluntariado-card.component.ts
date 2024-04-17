import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voluntariado-card',
  templateUrl: './voluntariado-card.component.html',
  styleUrls: ['./voluntariado-card.component.css'],
})
export class VoluntariadoCardComponent {
  @Input() vol: any;

  constructor(private router:Router) {
  }
  ver() {
    //nos movemos hacia ver
    this.router.navigate([`/menu_usuarios/ver_voluntariado/${this.vol.id}`]);
  }
}
