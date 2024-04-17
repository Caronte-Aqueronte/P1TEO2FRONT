import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { API_PATH } from 'src/globasl';

@Injectable({
  providedIn: 'root',
})
export class ContactoService {
  private url: string = `${API_PATH}/contactos`; //url de la api

  constructor(
    private http: HttpClient,
    private cookiesService: CookieService
  ) {}

  public eliminarReportes(id: any): Observable<any> {
    // Hacer la solicitud POST con los parámetros configurados
    return this.http.delete<any>(this.url + `/eliminarContacto/${id}`);
  }

  public traerContactosUsuario(id: any): Observable<any> {
    const params = new HttpParams().set('UserId', id);
    // Hacer la solicitud POST con los parámetros configurados
    return this.http.get<any>(this.url + `/traerContactosUsuario`, {
      params: params,
    });
  }

  public crearContacto(contacto: any): Observable<any> {
    // Hacer la solicitud POST con los parámetros configurados
    return this.http.post<any>(this.url + `/crearContacto`, contacto);
  }
}
