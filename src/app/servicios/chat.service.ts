import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { API_PATH } from 'src/globasl';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url: string = `${API_PATH}/chat`; //url de la api

  constructor(
    private http: HttpClient,
    private cookiesService: CookieService
  ) {}

  public crearChat(chat: any): Observable<any> {
    // Hacer una solicitud DELETE para eliminar el tag por su ID
    return this.http.post<any>(`${this.url}/crearChat/`, chat);
  }

  public listarMensajesDeUnChat(chatId: any): Observable<any> {
    // Configurar los parámetros para la solicitud GET
    const params = new HttpParams().set('chatId', chatId);
    // Hacer una solicitud DELETE para eliminar el tag por su ID
    return this.http.get<any>(`${this.url}/listarMensajesDeUnChat`, {
      params: params,
    });
  }

  public listarChatsDeUnUsuario(id: any): Observable<any> {
    // Configurar los parámetros para la solicitud GET
    const params = new HttpParams().set('UsuarioId', id);
    // Hacer una solicitud DELETE para eliminar el tag por su ID
    return this.http.get<any>(`${this.url}/listarChatsDeUnUsuario`, {
      params: params,
    });
  }
  
  public obtenerNombresUsuariosChat(chatId: any): Observable<any> {
    // Configurar los parámetros para la solicitud GET
    const params = new HttpParams().set('chatId', chatId);
    // Hacer una solicitud DELETE para eliminar el tag por su ID
    return this.http.get<any>(`${this.url}/obtenerNombresUsuariosChat`, {
      params: params,
    });
  }

  public crearMensaje(mensaje: any): Observable<any> {
    // Hacer una solicitud DELETE para eliminar el tag por su ID
    return this.http.post<any>(`${this.url}/crearMensaje/`, mensaje);
  }

  public eliminarChat(id: any): Observable<any> {
    // Hacer una solicitud DELETE para eliminar el usuario por su ID
    return this.http.delete<any>(`${this.url}/eliminarChat/${id}`);
  }


}
