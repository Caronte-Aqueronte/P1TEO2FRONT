import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompraService } from 'src/app/servicios/compra.service';
import { ProductoServiceService } from 'src/app/servicios/producto-service.service';
import { TagService } from 'src/app/servicios/tag.service';

@Component({
  selector: 'app-crear-compra',
  templateUrl: './crear-compra.component.html',
  styleUrls: ['./crear-compra.component.css'],
})
export class CrearCompraComponent implements OnInit {
  formSubir: FormGroup; //formulario para la subida de archivos
  imagenUrl: any = '';
  file!: File;
  banderaError: boolean = false;
  banderaAcierto: boolean = false;
  mensaje: string = '';
  productosRecomendados: Array<any> = new Array();
  tags: Array<any> = new Array();
  tagsSeleccionados: Array<any> = new Array();

  constructor(
    private formBuilder: FormBuilder,
    private compraService: CompraService,
    private productosSrvice: ProductoServiceService,
    private tagServise: TagService,
    private router:Router
  ) {
    this.formSubir = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(1)]],
      descripcion: ['', [Validators.required, Validators.minLength(1)]],
      imagen: ['', [Validators.required]],
      switch: [false, []],
    });
  }
  ngOnInit(): void {
    this.mostrarTodosLosTags();
  }

  public verProducto():void{

  }

  public anadirTag(id: any): void {
    // Extraemos el objeto del array de origen usando el índice proporcionado
    const objetoExtraido = this.tags.splice(id, 1)[0];
    // Insertamos el objeto extraído en el array de destino
    this.tagsSeleccionados.push(objetoExtraido);
    this.recomendarProductos();
  }

  public eliminarTag(id: any): void {
    // Extraemos el objeto del array de origen usando el índice proporcionado
    const objetoExtraido = this.tagsSeleccionados.splice(id, 1)[0];
    // Insertamos el objeto extraído en el array de destino
    this.tags.push(objetoExtraido);
    this.recomendarProductos();
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

  public mostrarTodosLosTags() {
    this.tagServise.traerTodosLosTags().subscribe((res) => {
      this.tags = res.tags;
      console.log(res);
    });
  }

  public recomendarProductos(): void {
    let nombrProducto = this.formSubir.controls['nombre'].value;
    this.productosSrvice
      .recomendarProductoPorNombreYTags(this.tagsSeleccionados,nombrProducto)
      .subscribe((res) => {
        console.log(res)
        this.productosRecomendados = res.productosRecomendados;
      });
  }

  public crearCompra(): void {
    //volver banderas de confirmacion a false
    this.banderaAcierto = false;
    this.banderaError = false;

    //usuar el servicio para enviar un nuevo articulo
    this.compraService
      .crearCompra(this.formSubir.value, this.file, this.tagsSeleccionados)
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
  }
}
