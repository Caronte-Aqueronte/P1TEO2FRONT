import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { API_PATH } from 'src/globasl';

@Injectable({
  providedIn: 'root'
})
export class ReporteService  {
  private url: string = `${API_PATH}/reporte`; //url de la api

  constructor(
    private http: HttpClient,
    private cookiesService: CookieService
  ) {}

  public crearReporte(idProd: any, motivo:any): Observable<any> {
    const body = {
      idProd: idProd,
      motivo: motivo
    };
    // Hacer la solicitud POST con los parámetros configurados
    return this.http.post<any>(this.url + '/crearReporte', body);
  }

  public eliminarReportes(idProd: any): Observable<any> {
    // Hacer la solicitud POST con los parámetros configurados
    return this.http.delete<any>(this.url + `/eliminarReportes/${idProd}`);
  }


}
