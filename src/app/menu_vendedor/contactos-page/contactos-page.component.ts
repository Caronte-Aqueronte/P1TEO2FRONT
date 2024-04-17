import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ContactoService } from 'src/app/servicios/contacto.service';

@Component({
  selector: 'app-contactos-page',
  templateUrl: './contactos-page.component.html',
  styleUrls: ['./contactos-page.component.css'],
})
export class ContactosPageComponent {
  formSubir: FormGroup; //formulario para la subida de archivos
  banderaError: boolean = false;
  banderaAcierto: boolean = false;
  mensaje: string = '';
  tags: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private contactoService: ContactoService,
    private cookiesService: CookieService
  ) {
    this.formSubir = this.formBuilder.group({
      tipo: ['', [Validators.required, Validators.minLength(1)]],
      contenido: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  ngOnInit(): void {
    this.mostrarContactos();
  }

  public mostrarContactos(): void {
    //usuar el servicio para enviar un nuevo articulo
    let userId = this.cookiesService.get('id');
    this.contactoService
      .traerContactosUsuario(userId)
      .subscribe((respuesta: any) => {
        this.tags = respuesta.contactos;
      });
  }

  public crearContacto(): void {
    //volver banderas de confirmacion a false
    this.banderaAcierto = false;
    this.banderaError = false;
    let newTag = {
      nombre: this.formSubir.value['tipo'],
      contenido: this.formSubir.value['contenido'],
      UserId: this.cookiesService.get('id'),
    };
    //usuar el servicio para enviar un nuevo articulo
    this.contactoService.crearContacto(newTag).subscribe((respuesta: any) => {
      if (respuesta.bandera === true) {
        this.banderaAcierto = true;
        this.borrarCampos();
      } else {
        this.banderaError = true;
        this.borrarCampos();
      }
      this.mensaje = respuesta.mensaje;
      this.mostrarContactos();
    });
  }

  private borrarCampos(): void {
    this.formSubir.controls['tipo'].setValue('');
    this.formSubir.controls['contenido'].setValue('');
  }
}
