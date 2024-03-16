import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { API_PATH } from 'src/globasl';

@Injectable({
  providedIn: 'root'
})
export class RetirosService {
  private url: string = `${API_PATH}/retiro`; //url de la api

  constructor(private http: HttpClient, private cookiesService:CookieService) {}

  public traerRetirosDelUsuario() {
    let idUsuario = this.cookiesService.get('id');
    // Configurar los parámetros para la solicitud GET
    const params = new HttpParams().set('userId', idUsuario);
    // Hacer la solicitud POST con los parámetros configurados
    return this.http.get<any>(this.url + '/traerRetirosDelUsuario', {params});
  }

}