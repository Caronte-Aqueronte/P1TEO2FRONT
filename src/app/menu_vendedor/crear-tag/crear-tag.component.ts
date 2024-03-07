import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { TagService } from 'src/app/servicios/tag.service';

@Component({
  selector: 'app-crear-tag',
  templateUrl: './crear-tag.component.html',
  styleUrls: ['./crear-tag.component.css'],
})
export class CrearTagComponent implements OnInit {
  formSubir: FormGroup; //formulario para la subida de archivos
  file!: File;
  banderaError: boolean = false;
  banderaAcierto: boolean = false;
  mensaje: string = '';
  tags: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private tagService: TagService,
    private cookiesService: CookieService
  ) {
    this.formSubir = this.formBuilder.group({
      nombreTag: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  ngOnInit(): void {
    this.mostrarTags();
  }

  public mostrarTags(): void {
    //usuar el servicio para enviar un nuevo articulo
    let userId = this.cookiesService.get('id');
    this.tagService.traerTagsDeUnUsuario(userId).subscribe((respuesta: any) => {
      console.log(respuesta);
      this.tags = respuesta.tags;
    });
  }

  public crearTag(): void {
    //volver banderas de confirmacion a false
    this.banderaAcierto = false;
    this.banderaError = false;
    let newTag = {
      nombre_tag: this.formSubir.value['nombreTag'],
      userId: this.cookiesService.get('id'),
    };
    //usuar el servicio para enviar un nuevo articulo
    this.tagService.crearTag(newTag).subscribe((respuesta: any) => {
      if (respuesta.bandera === true) {
        this.banderaAcierto = true;
        this.borrarCampos();
      } else {
        this.banderaError = true;
        this.borrarCampos();
      }
      this.mensaje = respuesta.mensaje;
      this.mostrarTags();
    });
  }

  private borrarCampos(): void {
    this.formSubir.controls['nombreTag'].setValue('');
  }
}
