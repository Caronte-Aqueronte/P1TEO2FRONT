import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoServiceService } from 'src/app/servicios/producto-service.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductoComponent {
  formSubir: FormGroup; //formulario para la subida de archivos
  imagenUrl: any = '';
  file!: File;
  banderaError: boolean = false;
  banderaAcierto: boolean = false;
  mensaje: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoServiceService
  ) {
    this.formSubir = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(1)]],
      descripcion: ['', [Validators.required, Validators.minLength(1)]],
      imagen: ['', [Validators.required]],
      precio: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  get nombre() {
    return this.formSubir.get('nombre');
  }

  get descripcion() {
    return this.formSubir.get('descripcion');
  }

  get precio() {
    return this.formSubir.get('precio');
  }

  public crearArticulo(): void {
    //volver banderas de confirmacion a false
    this.banderaAcierto = false;
    this.banderaError = false;

    //usuar el servicio para enviar un nuevo articulo
    this.productoService
      .crearProducto(this.formSubir.value, this.file)
      .subscribe((respuesta: any) => {
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

  public onFileChange(event: any): void {
    //se detecta el cambio del recurso en el imput file y lo despliega en un div
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0]; //cuargamos el archivo

      if (file.type.includes('image')) {
        //comprobamos si es una imagen
        var reader = new FileReader(); //crear nuevo reader
        reader.readAsDataURL(file); //leer la url

        reader.onload = (event: any) => {
          //cuando acabe de cargar entonces cargamos el src a la img html
          this.imagenUrl = event.target.result;
        };

        //toca igualar los files
        this.file = file;
      } else {
        console.log('error');
      }
    }
  }

  public borrarCampos(): void {
    this.imagenUrl = '';
    this.formSubir.controls['nombre'].setValue('');
    this.formSubir.controls['descripcion'].setValue('');
    this.formSubir.controls['imagen'].setValue('');
    this.formSubir.controls['precio'].setValue('');
  }
}
