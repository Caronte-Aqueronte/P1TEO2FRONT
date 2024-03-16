import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { API_PATH } from 'src/globasl';

@Injectable({
  providedIn: 'root'
})
export class MonedaService {
  private url: string = `${API_PATH}/moneda`; //url de la api

  constructor(
    private http: HttpClient,
    private cookiesService: CookieService
  ) {}

  public recargarMonedas(recarga: any) {
    const res = {
      ingreso_moneda: recarga,
      userId: this.cookiesService.get('id'),
    };
    // Hacer la solicitud POST con los parámetros configurados
    return this.http.post<any>(this.url + '/recargarMonedas', res);
  }

  public retirarMonedas(retiro: any) {
    const res = {
      cantidadRetiro: retiro,
      userId: this.cookiesService.get('id'),
    };
    // Hacer la solicitud POST con los parámetros configurados
    return this.http.post<any>(this.url + '/retirarMonedas', res);
  }

  public traerMonedasUsuario() {
    let idUsuario = this.cookiesService.get('id');
    // Configurar los parámetros para la solicitud GET
    const params = new HttpParams().set('userId', idUsuario);
    // Hacer la solicitud POST con los parámetros configurados
    return this.http.get<any>(this.url + '/traerMonedasUsuario', {params});
  }

  public traerMonedasRetirablesUsuario() {
    let idUsuario = this.cookiesService.get('id');
    // Configurar los parámetros para la solicitud GET
    const params = new HttpParams().set('userId', idUsuario);
    // Hacer la solicitud POST con los parámetros configurados
    return this.http.get<any>(this.url + '/traerMonedasRetirablesUsuario', {params});
  }


}
