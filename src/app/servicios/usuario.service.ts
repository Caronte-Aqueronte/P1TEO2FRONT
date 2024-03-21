import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// archivo.ts

import { API_PATH } from '../../globasl';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url: string = `${API_PATH}/usuario`; //url de la api

  constructor(
    private http: HttpClient,
    private cookiesService: CookieService
  ) {}

  public login(usuario: any): Observable<any> {
    return this.http.post<any>(this.url + '/login', usuario); //hacer un post a la aplicacion enviando la info del cliente
  }

  public crearUsuarioNormal(usuario: any): Observable<any> {
    return this.http.post<any>(this.url + '/crearUsuarioNormal', usuario); //hacer un post a la aplicacion enviando la info del cliente
  }

  public crearUsuarioAdmin(usuario: any): Observable<any> {
    return this.http.post<any>(this.url + '/crearUsuarioAdmin', usuario); //hacer un post a la aplicacion enviando la info del cliente
  }

  public traerSolicitudes(): Observable<any> {
    return this.http.get<any>(this.url + '/traerSolicitudes'); //hacer un post a la aplicacion enviando la info del cliente
  }

  public traerUsuarios(): Observable<any> {
    let vars = new HttpParams().set(
      'id',
      this.cookiesService.get('id')
    );
    return this.http.get<any>(this.url + '/traerUsuarios', { params: vars }); //hacer un post a la aplicacion enviando la info del cliente
  }

  public buscarUsuariosPorNombre(nombreUsuario: any): Observable<any> {
    let vars = new HttpParams().set('nombreUsuario', nombreUsuario);
    return this.http.get<any>(this.url + '/buscarUsuariosPorNombre', {
      params: vars,
    }); //hacer un post a la aplicacion enviando la info del cliente
  }

  public eliminarUsuarioPorId(id: any): Observable<any> {
    // Hacer una solicitud DELETE para eliminar el usuario por su ID
    return this.http.delete<any>(`${this.url}/eliminarUsuario/${id}`);
  }

  public aceptarUsuario(id: any): Observable<any> {
    let body = {
      id: id,
    };
    return this.http.post<any>(this.url + '/aceptarUsuario', body); //hacer un post a la aplicacion enviando la info del cliente
  }
}
