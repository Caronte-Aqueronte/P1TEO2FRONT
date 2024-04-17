import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { API_PATH } from 'src/globasl';

@Injectable({
  providedIn: 'root',
})
export class VoluntariadoService {
  private url: string = `${API_PATH}/voluntariado`; //url de la api

  constructor(
    private http: HttpClient,
    private cookiesService: CookieService
  ) {}

  public crearVoluntariado(venta: any): Observable<any> {
    return this.http.post<any>(this.url + '/crearVoluntariado', venta); //hacer un post a la aplicacion enviando la info del cliente
  }

  public participar(vol: any): Observable<any> {
    return this.http.post<any>(this.url + '/participar', vol); //hacer un post a la aplicacion enviando la info del cliente
  }

  public traerVoluntariados(): Observable<any> {
    let params = new HttpParams().set('UserId', this.cookiesService.get('id'));
    return this.http.get<any>(this.url + '/traerVoluntariados', {
      params: params,
    }); //hacer un post a la aplicacion enviando la info del cliente
  }

  public traerVoluntariadoPorId(id: any): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.http.get<any>(this.url + '/traerVoluntariadoPorId', {
      params: params
    }); //hacer un post a la aplicacion enviando la info del cliente
  }
}
