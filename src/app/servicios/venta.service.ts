import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { API_PATH } from 'src/globasl';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private url: string = `${API_PATH}/ventas`; //url de la api

  constructor(
    private http: HttpClient
  ) {}

  public venta(venta: any): Observable<any> {
    return this.http.post<any>(this.url + '/venta', venta); //hacer un post a la aplicacion enviando la info del cliente
  }

}
