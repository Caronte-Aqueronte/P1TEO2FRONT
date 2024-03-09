import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuVendedorPageComponent } from './menu_vendedor/menu-vendedor-page/menu-vendedor-page.component';
import { NavBarVendedorComponent } from './menu_vendedor/nav-bar-vendedor/nav-bar-vendedor.component';
import { CrearProductoComponent } from './menu_vendedor/crear-producto/crear-producto.component';
import { EditarProductoComponent } from './menu_vendedor/editar-producto/editar-producto.component';
import { CrearTagComponent } from './menu_vendedor/crear-tag/crear-tag.component';
import { TagComponent } from './menu_vendedor/tag/tag.component';
import { APP_BASE_HREF } from '@angular/common';
import { TagEliminarComponent } from './menu_vendedor/tag-eliminar/tag-eliminar.component';
import { TagAddComponent } from './menu_vendedor/tag-add/tag-add.component';
import { TagDelComponent } from './menu_vendedor/tag-del/tag-del.component';
import { TusProductosComponent } from './menu_vendedor/tus-productos/tus-productos.component';
import { ProductoCardVendedorComponent } from './menu_vendedor/producto-card-vendedor/producto-card-vendedor.component';
import { ProductoCardVendidoComponent } from './menu_vendedor/producto-card-vendido/producto-card-vendido.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuVendedorPageComponent,
    NavBarVendedorComponent,
    CrearProductoComponent,
    EditarProductoComponent,
    CrearTagComponent,
    TagComponent,
    TagEliminarComponent,
    TagAddComponent,
    TagDelComponent,
    TusProductosComponent,
    ProductoCardVendedorComponent,
    ProductoCardVendidoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CookieService,
    {
      provide: APP_BASE_HREF,
      useValue: './',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
