import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// archivo.ts

import { API_PATH } from '../../globasl';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private url: string = `${API_PATH}/usuario`; //url de la api

  constructor(private http: HttpClient) {}

  public login(usuario: any): Observable<any> {
    return this.http.post<any>(this.url + '/login', usuario); //hacer un post a la aplicacion enviando la info del cliente
  }

  public crearUsuario(usuario: any): Observable<any> {
    return this.http.post<any>(this.url + '/createUser', usuario); //hacer un post a la aplicacion enviando la info del cliente
  }
}
