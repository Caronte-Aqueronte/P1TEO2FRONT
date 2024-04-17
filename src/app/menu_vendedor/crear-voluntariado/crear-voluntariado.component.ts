import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { VoluntariadoService } from 'src/app/servicios/voluntariado.service';

@Component({
  selector: 'app-crear-voluntariado',
  templateUrl: './crear-voluntariado.component.html',
  styleUrls: ['./crear-voluntariado.component.css']
})
export class CrearVoluntariadoComponent implements OnInit {
  formSubir: FormGroup; //formulario para la subida de archivos

  banderaError: boolean = false;
  banderaAcierto: boolean = false;
  mensaje: string = '';


  constructor(
    private formBuilder: FormBuilder,
    private voluntariadoService: VoluntariadoService,
    private cookiesService: CookieService
  ) {
    this.formSubir = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(1)]],
      descripcion: ['', [Validators.required, Validators.minLength(1)]],
      premio: ['', [Validators.required]],
      mostrar_contacto: [false, []],
    });
  }
  ngOnInit(): void {}

  public crearVol(): void {
    //volver banderas de confirmacion a false
    this.banderaAcierto = false;
    this.banderaError = false;

    let vol = {
      nombre: this.formSubir.value['nombre'],
      descripcion: this.formSubir.value['descripcion'],
      mostrar_contacto: this.formSubir.value['mostrar_contacto'],
      premio: this.formSubir.value['premio'],
      UserId: this.cookiesService.get('id'),
    }

    //usuar el servicio para enviar un nuevo articulo
    this.voluntariadoService
      .crearVoluntariado(vol)
      .subscribe((respuesta: any) => {
        console.log(respuesta)
        if (respuesta.bandera === true) {
          this.banderaAcierto = true;
          this.borrarCampos();
        } else {
          this.banderaError = true;
          this.borrarCampos();
        }
        this.mensaje = respuesta.mensaje;
      });
  }



  public borrarCampos(): void {
    this.formSubir.controls['nombre'].setValue('');
    this.formSubir.controls['descripcion'].setValue('');
    this.formSubir.controls['premio'].setValue('');
  }
}
