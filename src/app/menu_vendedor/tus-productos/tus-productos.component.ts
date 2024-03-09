import { Component, OnInit } from '@angular/core';
import { ProductoServiceService } from 'src/app/servicios/producto-service.service';

@Component({
  selector: 'app-tus-productos',
  templateUrl: './tus-productos.component.html',
  styleUrls: ['./tus-productos.component.css'],
})
export class TusProductosComponent implements OnInit {
  productosAprobados: Array<any> = [];
  productosPendientes: Array<any> = [];
  productosRechazados: Array<any> = [];
  productosVendidos: Array<any> = [];
  constructor(private productoService: ProductoServiceService) {}
  ngOnInit(): void {
    this.mostrarProductos();
  }
  private mostrarProductos(): void {
    this.mostrarProductosPendientes();
    this.mostrarProductosAprovados();
    this.mostrarProductosRechazados();
    this.traerProductosVendidosDelUsuario();
  }
  public mostrarProductosPendientes(): void {
    this.productoService
      .traerProductosPendientesDeUnUsuario()
      .subscribe((res) => {
        this.productosPendientes = res.productos;
      });
  }

  public mostrarProductosAprovados(): void {
    this.productoService
      .traerProductosAprobadosDeUnUsuario()
      .subscribe((res) => {
        this.productosAprobados = res.productos;
      });
  }

  public mostrarProductosRechazados(): void {
    this.productoService
      .traerProductosRechazadosDeUnUsuario()
      .subscribe((res) => {
        this.productosRechazados = res.productos;
      });
  }

  public traerProductosVendidosDelUsuario(): void {
    this.productoService.traerProductosVendidosDelUsuario().subscribe((res) => {
      this.productosVendidos = res.productos;
    });
  }

  public eliminarProducto(id: any): void {
    this.productoService.eliminarProducto(id).subscribe((res) => {
      alert(res.mensaje);
      this.mostrarProductos();
    });
  }
}
