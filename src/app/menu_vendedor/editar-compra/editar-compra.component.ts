import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductoServiceService } from 'src/app/servicios/producto-service.service';
import { TagService } from 'src/app/servicios/tag.service';
import { API_PATH } from 'src/globasl';

@Component({
  selector: 'app-editar-compra',
  templateUrl: './editar-compra.component.html',
  styleUrls: ['./editar-compra.component.css'],
})
export class EditarCompraComponent implements OnInit {
  articuloAEditar: any = null; //articulo que mandaremos a editar

  formEditarInfo: FormGroup; //formulario para la subida de archivos
  formEditarImagen: FormGroup; //formulario para la subida de archivos

  imagenUrl: any = API_PATH;
  tags: Array<any> = new Array();
  tagsSeleccionados: Array<any> = new Array();
  file!: File; //imagen del articulo
  banderaErrorImg: boolean = false;
  banderaAciertoImg: boolean = false;
  banderaErrorInfo: boolean = false;
  banderaAciertoInfo: boolean = false;

  constructor(
    private productoService: ProductoServiceService,
    private rutaActiva: ActivatedRoute,
    private formBuilder: FormBuilder,
    private tagService: TagService
  ) {
    this.formEditarInfo = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(1)]],
      descripcion: ['', [Validators.required, Validators.minLength(1)]],
      precio: ['', [Validators.required, Validators.minLength(1)]],
      switch: [false, []],
    });

    this.formEditarImagen = this.formBuilder.group({
      imagen: ['', [Validators.required]],
    });

    const id = this.rutaActiva.snapshot.params['id']; //obtenemos el id d los parametros que nos envian

    //mandamos a buscar el aticulo por id
    this.productoService.traerProductoPorId(id).subscribe((respuesta: any) => {
      if (!respuesta.bandera) {
        alert(respuesta.mensaje);
        return;
      }

      this.articuloAEditar = respuesta.producto;
      //cargamos los valores en los box
      this.imagenUrl += '/' + respuesta.producto.imagen;
      this.formEditarInfo.controls['nombre'].setValue(
        respuesta.producto.nombre
      );
      this.formEditarInfo.controls['descripcion'].setValue(
        respuesta.producto.descripcion
      );
      this.formEditarInfo.controls['precio'].setValue(
        respuesta.producto.precio
      );
      this.formEditarInfo.controls['switch'].setValue(
        respuesta.producto.mostrar_contacto
      );
      this.mostrarTodosLosTags();
    });
  }
  ngOnInit(): void {}

  private mostrarTodosLosTags() {
    this.tagService.traerTodosLosTags().subscribe((res) => {
      this.tags = res.tags;
      this.seleccionarTags();
    });
  }

  private seleccionarTags() {
    let index = 0;
    for (let tag of this.tags) {
      for (let tag2 of this.articuloAEditar.tags) {
        if (tag.id === tag2.id) {
          this.anadirTag(index);
        }
      }
      index++;
    }
  }

  public editarFotoDelArticulo(): void {
    const id = this.rutaActiva.snapshot.params['id']; //obtenemos el id d los parametros que nos envian
    //nos suscribimos al metodo de edicion de imagen
    this.productoService
      .editarImagenDeArticulo(id, this.file)
      .subscribe((respuesta: any) => {
        alert(respuesta.mensaje);
      });
  }

  public anadirTag(id: any): void {
    // Extraemos el objeto del array de origen usando el índice proporcionado
    const objetoExtraido = this.tags.splice(id, 1)[0];

    // Insertamos el objeto extraído en el array de destino
    this.tagsSeleccionados.push(objetoExtraido);
  }

  public eliminarTag(id: any): void {
    // Extraemos el objeto del array de origen usando el índice proporcionado
    const objetoExtraido = this.tagsSeleccionados.splice(id, 1)[0];

    // Insertamos el objeto extraído en el array de destino
    this.tags.push(objetoExtraido);
  }

  public editarInfoDelArticulo(): void {
    const id = this.rutaActiva.snapshot.params['id']; //obtenemos el id d los parametros que nos envian
    //nos suscribimos al metodo de edicion de imagen
    this.productoService
      .editarInformacionDeArticulo(this.formEditarInfo.value, id, this.tagsSeleccionados)
      .subscribe((respuesta: any) => {
        alert(respuesta.mensaje);
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
}
