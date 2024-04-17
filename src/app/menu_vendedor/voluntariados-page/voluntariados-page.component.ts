import { Component, OnInit } from '@angular/core';
import { VoluntariadoService } from 'src/app/servicios/voluntariado.service';

@Component({
  selector: 'app-voluntariados-page',
  templateUrl: './voluntariados-page.component.html',
  styleUrls: ['./voluntariados-page.component.css'],
})
export class VoluntariadosPageComponent implements OnInit {
  vols: any;

  constructor(private volunetariadoService: VoluntariadoService) {}
  ngOnInit(): void {
    this.mostrarVolintariados();
  }
  mostrarVolintariados() {
    this.volunetariadoService.traerVoluntariados().subscribe((res) => {
      if (res.bandera) {
        this.vols = res.voluntariados;
      } else {
        alert(res.mensaje);
      }
    });
  }
}
