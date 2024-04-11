import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { API_PATH } from 'src/globasl';

@Injectable({
  providedIn: 'root',
})
export class ProductoServiceService {
  private url: string = `${API_PATH}/producto`; //url de la api

  constructor(
    private http: HttpClient,
    private cookiesService: CookieService
  ) {}

  public crearProducto(
    producto: any,
    imagen: File,
    tags: any
  ): Observable<any> {
    const form = new FormData(); //creamos el form
    form.append('userId', this.cookiesService.get('id')); //extraer el usuario vendedor de los cookies
    form.append('nombre', producto.nombre);
    form.append('descripcion', producto.descripcion);
    form.append('precio', producto.precio);
    form.append('mostrar_contacto', producto.switch);
    form.append('tags', JSON.stringify(tags));
    form.append('file', imagen, 'form-data'); //adjuntar la imagen

    return this.http.post<any>(this.url + '/crearProducto', form); //hacer un post a la aplicacion enviando la info del cliente
  }

  public editarImagenDeArticulo(id: string, imagen: File): Observable<any> {
    const form = new FormData(); //creamos el form
    form.append('id', id);
    form.append('file', imagen, 'form-data'); //adjuntar la imagen
    return this.http.post<any>(this.url + '/actualizarImagenProducto', form);
  }

  public editarInformacionDeArticulo( articulo: any,
    id:any, tags:any
  ): Observable<any> {
    const form = new FormData(); //creamos el form
    form.append('id', id);
    form.append('nombre', articulo.nombre);
    form.append('descripcion', articulo.descripcion);
    form.append('precio', articulo.precio);
    form.append('mostrar_contacto', articulo.switch);
    form.append('tags', JSON.stringify(tags));

    console.log("ar", articulo)
    return this.http.post<any>(this.url + '/editarProducto', form);
  }


  public eliminarProducto(id: any): Observable<any> {
    // Hacer una solicitud DELETE para eliminar el tag por su ID
    return this.http.delete<any>(`${this.url}/eliminarProducto/${id}`);
  }

  public traerProductosAprobadosDeUnUsuario(): Observable<any> {
    let idUsuario = this.cookiesService.get('id');
    // Configurar los parámetros para la solicitud GET
    const params = new HttpParams().set('userId', idUsuario);

    // Hacer la solicitud GET con los parámetros configurados
    return this.http.get<any>(
      this.url + '/traerProductosAprobadosDeUnUsuario',
      {
        params: params,
      }
    );
  }

  public traerTodosLosProductosQueNoPertenezanAlUsuario(): Observable<any> {
    let idUsuario = this.cookiesService.get('id');
    // Configurar los parámetros para la solicitud GET
    const params = new HttpParams().set('userId', idUsuario);

    // Hacer la solicitud GET con los parámetros configurados
    return this.http.get<any>(
      this.url + '/traerTodosLosProductosQueNoPertenezanAlUsuario',
      {
        params: params,
      }
    );
  }

  public traerProductoPorId(id: any): Observable<any> {
    // Configurar los parámetros para la solicitud GET
    const params = new HttpParams().set('id', id);
    // Hacer la solicitud GET con los parámetros configurados
    return this.http.get<any>(this.url + '/traerProductoPorId', {
      params: params,
    });
  }

  public traerProductosVendidosDelUsuario(): Observable<any> {
    let idUsuario = this.cookiesService.get('id');
    // Configurar los parámetros para la solicitud GET
    const params = new HttpParams().set('userId', idUsuario);

    // Hacer la solicitud GET con los parámetros configurados
    return this.http.get<any>(this.url + '/traerProductosVendidosDelUsuario', {
      params: params,
    });
  }
  public traerProductosRechazadosDeUnUsuario(): Observable<any> {
    let idUsuario = this.cookiesService.get('id');
    // Configurar los parámetros para la solicitud GET
    const params = new HttpParams().set('userId', idUsuario);

    // Hacer la solicitud GET con los parámetros configurados
    return this.http.get<any>(
      this.url + '/traerProductosRechazadosDeUnUsuario',
      {
        params: params,
      }
    );
  }

  public traerProductosPendientesDeUnUsuario(): Observable<any> {
    let idUsuario = this.cookiesService.get('id');
    // Configurar los parámetros para la solicitud GET
    const params = new HttpParams().set('userId', idUsuario);

    // Hacer la solicitud GET con los parámetros configurados
    return this.http.get<any>(
      this.url + '/traerProductosPendientesDeUnUsuario',
      {
        params: params,
      }
    );
  }

  public traerSolicitudesDeAprovacion(): Observable<any> {
    // Hacer la solicitud GET con los parámetros configurados
    return this.http.get<any>(this.url + '/traerSolicitudesDeAprovacion');
  }

  public mostrarProductosReportados(): Observable<any> {
    // Hacer la solicitud GET con los parámetros configurados
    return this.http.get<any>(this.url + '/mostrarProductosReportados');
  }

  public aceptarProducto(id: any): Observable<any> {
    // Hacer la solicitud GET con los parámetros configurados
    return this.http.post<any>(this.url + '/aceptarProducto', { id: id });
  }

  public rechazarProducto(id: any): Observable<any> {
    // Hacer la solicitud GET con los parámetros configurados
    return this.http.post<any>(this.url + '/rechazarProducto', { id: id });
  }

  public recomendarProductoPorNombreYTags(tags: any, nombre: any) {
    const res = {
      nombreProducto: nombre,
      etiquetas: tags,
      idUsuario: this.cookiesService.get('id'),
    };
    // Hacer la solicitud POST con los parámetros configurados
    return this.http.post<any>(this.url + '/recomendarProductos', res);
  }

  public buscarProducto(tags: any, nombre: any) {
    const res = {
      nombreProducto: nombre,
      etiquetas: tags,
      idUsuario: this.cookiesService.get('id'),
    };
    // Hacer la solicitud POST con los parámetros configurados
    return this.http.post<any>(this.url + '/buscarProducto', res);
  }
}
