import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LogoutService } from 'src/app/servicios/logout.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  banderaError: boolean = false;
  formLogin: FormGroup;
  mensajeError: any = '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioServise: UsuarioService,
    private cookiesService: CookieService,
    private logoutService: LogoutService
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
    });
  }

  ngOnInit(): void {}

  get email() {
    return this.formLogin.get('email');
  }
  get password() {
    return this.formLogin.get('password');
  }

  public login() {
    //seteamos la bandera de error como false
    this.banderaError = false;
    const passwordEntry = this.formLogin.value['password'];
    const correoEntry = this.formLogin.value['email'];

    const usuario = {
      email: correoEntry,
      password: passwordEntry,
    };
    this.usuarioServise.login(usuario).subscribe((respuesta: any) => {
      console.log(respuesta);
      //si no se devuelve null entonces decidimos a que menu enviar al usuario
      if (respuesta.bandera == true) {
        //guardamos la info del cliente
        this.cookiesService.set('email', correoEntry);
        this.cookiesService.set(
          'user',
          respuesta.usuarioEncontrado.nombre_usuario
        );
        this.cookiesService.set('id', respuesta.usuarioEncontrado.id);
        switch (respuesta.usuarioEncontrado.rol) {
          case 'admin': {
            this.router.navigate(['/menu_admin/administrar_usuarios']);
            break;
          }
          case 'usuario': {
            this.router.navigate(['/menu_usuarios/muro_productos']);
            break;
          }
          default: {
            break;
          }
        }
      } else {
        this.banderaError = true; //si el login fallo entonces activamos el error
        this.mensajeError = respuesta.mensaje;
      }
    });
  }

  public logOut() {
    this.logoutService.logOut(false);
  }
}
