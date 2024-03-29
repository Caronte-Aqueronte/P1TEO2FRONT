import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css'],
})
export class CrearUsuarioComponent {
  banderaError: boolean = false;
  banderaAcierto: boolean = false;
  formLogin: FormGroup;
  mensajeError: any = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioServise: UsuarioService,
    private cookiesService: CookieService
  ) {
    this.formLogin = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(1),
          Validators.maxLength(256),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      nombre_usuario: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  get email() {
    return this.formLogin.get('email');
  }
  get password() {
    return this.formLogin.get('password');
  }
  get nombre_usuario() {
    return this.formLogin.get('nombre_usuario');
  }

  public crearUsuario() {
    //seteamos la bandera de error como false
    this.banderaError = false;
    this.banderaAcierto = false;
    this.usuarioServise
      .crearUsuarioNormal(this.formLogin.value)
      .subscribe((respuesta: any) => {
        //si no se devuelve null entonces decidimos a que menu enviar al usuario
        if (respuesta.bandera === true) {
          this.banderaAcierto = true; //si el login fallo entonces activamos el error
          this.mensajeError = respuesta.mensaje;
        } else {
          this.banderaError = true; //si el login fallo entonces activamos el error
          this.mensajeError = respuesta.mensaje;
        }
      });
  }
}
