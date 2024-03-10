import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { API_PATH } from 'src/globasl';

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  private url: string = `${API_PATH}/compra`; //url de la api

  constructor(
    private http: HttpClient,
    private cookiesService: CookieService
  ) {}

  public crearCompra(producto: any, imagen: File, tags: any): Observable<any> {
    const form = new FormData(); //creamos el form
    form.append('userId', this.cookiesService.get('id')); //extraer el usuario vendedor de los cookies
    form.append('nombre', producto.nombre);
    form.append('descripcion', producto.descripcion);
    form.append('mostrar_contacto', producto.switch);
    form.append('tags', JSON.stringify(tags));
    form.append('file', imagen, 'form-data'); //adjuntar la imagen

    return this.http.post<any>(this.url + '/crearCompra', form); //hacer un post a la aplicacion enviando la info del cliente
  }
}
