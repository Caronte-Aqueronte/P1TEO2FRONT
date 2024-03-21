import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-administrar-usuarios',
  templateUrl: './administrar-usuarios.component.html',
  styleUrls: ['./administrar-usuarios.component.css'],
})
export class AdministrarUsuariosComponent implements OnInit {
  nombreUsuario = '';
  solicitudes: any = [];
  usuarios: any = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.traerSolicitudes();
    this.traerUsuarios();
  }

  public eliminarUsuario(id: any) {
    this.usuarioService.eliminarUsuarioPorId(id).subscribe((res) => {
      alert(res.mensaje);
      if (res.bandera) {
        this.traerUsuarios();
      }
    });
  }

  public aceptarUsuario(id: any) {
    this.usuarioService.aceptarUsuario(id).subscribe((res) => {
      alert(res.mensaje);
      if (res.bandera) {
        this.traerSolicitudes();
        this.traerUsuarios();
      }
    });
  }

  public traerSolicitudes() {
    this.usuarioService.traerSolicitudes().subscribe((res) => {
      this.solicitudes = res;
    });
  }

  public traerUsuarios() {
    this.usuarioService.traerUsuarios().subscribe((res) => {
      this.usuarios = res;
    });
  }

  public buscarUsuariosPorNombre() {
    this.usuarioService.buscarUsuariosPorNombre(this.nombreUsuario).subscribe((res) => {
      this.usuarios = res;
    });
  }
}
