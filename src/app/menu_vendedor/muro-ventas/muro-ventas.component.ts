import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoServiceService } from 'src/app/servicios/producto-service.service';
import { TagService } from 'src/app/servicios/tag.service';

@Component({
  selector: 'app-muro-ventas',
  templateUrl: './muro-ventas.component.html',
  styleUrls: ['./muro-ventas.component.css'],
})
export class MuroVentasComponent implements OnInit {
  productos: Array<any> = new Array();
  productoBuscado: any = '';

  tags: Array<any> = new Array();
  tagsSeleccionados: Array<any> = new Array();

  constructor(
    private productosSrvice: ProductoServiceService,
    private tagServise: TagService
  ) {}

  ngOnInit(): void {
    this.mostrarTodosLosTags();
    this.mostrarTodosLosProductos();
  }

  public anadirTag(id: any): void {
    // Extraemos el objeto del array de origen usando el índice proporcionado
    const objetoExtraido = this.tags.splice(id, 1)[0];
    // Insertamos el objeto extraído en el array de destino
    this.tagsSeleccionados.push(objetoExtraido);
    this.buscarProducto();
  }

  public eliminarTag(id: any): void {
    // Extraemos el objeto del array de origen usando el índice proporcionado
    const objetoExtraido = this.tagsSeleccionados.splice(id, 1)[0];
    // Insertamos el objeto extraído en el array de destino
    this.tags.push(objetoExtraido);
    this.buscarProducto();
  }

  public buscarProducto() {
    this.productosSrvice
      .buscarProducto(this.tagsSeleccionados,this.productoBuscado)
      .subscribe((res) => {
        this.productos = res.productos;
      });
  }

  public mostrarTodosLosTags() {
    this.tagServise.traerTodosLosTags().subscribe((res) => {
      this.tags = res.tags;
      console.log(res);
    });
  }

  public mostrarTodosLosProductos() {
    this.productosSrvice.traerTodosLosProductosQueNoPertenezanAlUsuario().subscribe((res) => {
      this.productos = res.productos;
    });
  }
}
