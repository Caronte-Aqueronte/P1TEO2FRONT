import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_PATH } from 'src/globasl';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  private url: string = `${API_PATH}/tags`; //url de la api

  constructor(private http: HttpClient) {}

  public crearTag(tag: any): Observable<any> {
    return this.http.post<any>(this.url + '/crearTag', tag); //hacer un post a la aplicacion enviando la info del cliente
  }

  public traerTagsDeUnUsuario(userId: any): Observable<any> {
    // Configurar los parámetros para la solicitud GET
    const params = new HttpParams().set('userId', userId);

    // Hacer la solicitud GET con los parámetros configurados
    return this.http.get<any>(this.url + '/traerTagsDeUnUsuario', {
      params: params,
    });
  }

  public traerTodosLosTags(): Observable<any> {
    // Hacer la solicitud GET con los parámetros configurados
    return this.http.get<any>(this.url + '/traerTodosLosTags');
  }

  public eliminarTagPorId(tagId: any): Observable<any> {
    // Hacer una solicitud DELETE para eliminar el tag por su ID
    return this.http.delete<any>(`${this.url}/eliminarTag/${tagId}`);
  }
}
