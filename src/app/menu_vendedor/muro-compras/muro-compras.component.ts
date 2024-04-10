import { Component, OnInit } from '@angular/core';
import { CompraService } from 'src/app/servicios/compra.service';
import { TagService } from 'src/app/servicios/tag.service';

@Component({
  selector: 'app-muro-compras',
  templateUrl: './muro-compras.component.html',
  styleUrls: ['./muro-compras.component.css']
})
export class MuroComprasComponent implements OnInit {
  productos: Array<any> = new Array();
  productoBuscado: any = '';

  tags: Array<any> = new Array();
  tagsSeleccionados: Array<any> = new Array();

  constructor(
    private compraService : CompraService,
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
    this.compraService
      .buscarCompras(this.tagsSeleccionados,this.productoBuscado)
      .subscribe((res) => {
        console.log(res)
        this.productos = res.productos;
      });
  }

  public mostrarTodosLosTags() {
    this.tagServise.traerTodosLosTags().subscribe((res) => {
      this.tags = res.tags;
    });
  }

  public mostrarTodosLosProductos() {
    this.compraService
      .traerTodosLasComprasQueNoPertenezanAlUsuario()
      .subscribe((res) => {
        console.log(res)
        this.productos = res.compras;
      });
  }
}
