import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonedaService } from 'src/app/servicios/moneda.service';
import { RetirosService } from 'src/app/servicios/retiros.service';

@Component({
  selector: 'app-monedas',
  templateUrl: './monedas.component.html',
  styleUrls: ['./monedas.component.css'],
})
export class MonedasComponent implements OnInit {
  formCompra: FormGroup; //formulario para la subida de archivos
  formRetiro: FormGroup; //formulario para la subida de archivos

  banderaError: boolean = false;
  banderaAcierto: boolean = false;
  mensaje: string = '';
  //banderas error o acierto de retiro de dinero
  banderaErrorRetiro: boolean = false;
  banderaAciertoRetiro: boolean = false;
  mensajeRetiro: string = '';
  //monedas del usuario
  monedasDelUsuario: any;
  retirables: any;
  totalRetiros: any;

  constructor(
    private formBuilder: FormBuilder,
    private monedaService: MonedaService,
    private retiroService: RetirosService
  ) {
    this.formCompra = this.formBuilder.group({
      cantidadCompra: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.formRetiro = this.formBuilder.group({
      cantidadRetiro: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  ngOnInit(): void {
    this.traerMonedasDelUsuario();
    this.traerMonedasRetirablesDelUsuario();
    this.traerRetirosDelUsuario();
  }

  public comprarMonedas(): void {
    //volver banderas de confirmacion a false
    this.banderaAcierto = false;
    this.banderaError = false;
    let recarga = this.formCompra.controls['cantidadCompra'].value;
    //usuar el servicio para enviar un nuevo articulo
    this.monedaService.recargarMonedas(recarga).subscribe((respuesta: any) => {
      if (respuesta.bandera === true) {
        this.monedasDelUsuario += recarga;
        this.retirables += recarga;
        this.banderaAcierto = true;
      } else {
        this.banderaError = true;
      }
      this.borrarCamposCompra();
      this.mensaje = respuesta.mensaje;
    });
  }

  public retirarMonedas(): void {
    //volver banderas de confirmacion a false
    this.banderaAciertoRetiro = false;
    this.banderaErrorRetiro = false;
    let retiro = this.formRetiro.controls['cantidadRetiro'].value;
    //usuar el servicio para enviar un nuevo articulo
    this.monedaService.retirarMonedas(retiro).subscribe((respuesta: any) => {
      if (respuesta.bandera === true) {
        this.retirables -= retiro;
        this.monedasDelUsuario -= retiro;
        this.totalRetiros += retiro;
        this.banderaAciertoRetiro = true;
      } else {
        this.banderaErrorRetiro = true;
      }
      this.borrarCamposRetiro();
      this.mensajeRetiro = respuesta.mensaje;
    });
  }

  public traerMonedasDelUsuario(): void {
    //usuar el servicio para enviar un nuevo articulo
    this.monedaService.traerMonedasUsuario().subscribe((respuesta: any) => {
      this.monedasDelUsuario = respuesta.cantidad_monedas;
    });
  }

  public traerRetirosDelUsuario(): void {
    //usuar el servicio para enviar un nuevo articulo
    this.retiroService.traerRetirosDelUsuario().subscribe((respuesta: any) => {
      this.totalRetiros = respuesta.cantidad_monedas;
    });
  }

  public traerMonedasRetirablesDelUsuario(): void {
    //usuar el servicio para enviar un nuevo articulo
    this.monedaService
      .traerMonedasRetirablesUsuario()
      .subscribe((respuesta: any) => {
        this.retirables = respuesta.cantidad_monedas;
      });
  }

  public borrarCamposCompra(): void {
    this.formCompra.controls['cantidadCompra'].setValue('');
  }

  public borrarCamposRetiro(): void {
    this.formRetiro.controls['cantidadRetiro'].setValue('');
  }
}
