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
import { CrearCompraComponent } from './menu_vendedor/crear-compra/crear-compra.component';
import { CardProductoCompraComponent } from './menu_vendedor/card-producto-compra/card-producto-compra.component';
import { VerproductoComponent } from './menu_vendedor/verproducto/verproducto.component';
import { MonedasComponent } from './menu_vendedor/monedas/monedas.component';
import { AdminPageComponent } from './menu_admin/admin-page/admin-page.component';
import { CrearUsuarioComponent } from './auth/crear-usuario/crear-usuario.component';
import { NavBarAdminComponent } from './menu_admin/nav-bar-admin/nav-bar-admin.component';
import { CrearUsuarioAdminComponent } from './menu_admin/crear-usuario-admin/crear-usuario-admin.component';
import { AdministrarUsuariosComponent } from './menu_admin/administrar-usuarios/administrar-usuarios.component';
import { UserCardComponent } from './menu_admin/user-card/user-card.component';
import { UserCardSolicitudComponent } from './menu_admin/user-card-solicitud/user-card-solicitud.component';
import { AdministrarPostComponent } from './menu_admin/administrar-post/administrar-post.component';
import { ProductoCardAprovacionComponent } from './menu_admin/producto-card-aprovacion/producto-card-aprovacion.component';
import { ProductoCardReportadaComponent } from './menu_admin/producto-card-reportada/producto-card-reportada.component';
import { VerProductoAdminComponent } from './menu_admin/ver-producto-admin/ver-producto-admin.component';
import { MuroVentasComponent } from './menu_vendedor/muro-ventas/muro-ventas.component';
import { MuroComprasComponent } from './menu_vendedor/muro-compras/muro-compras.component';
import { ChatsComponent } from './menu_vendedor/chats/chats.component';
import { ChatCardComponent } from './menu_vendedor/chat-card/chat-card.component';
import { ChatPageComponent } from './menu_vendedor/chat-page/chat-page.component';
import { VerCompraComponent } from './menu_vendedor//ver-compra/ver-compra.component';
import { CompraCardComponent } from './menu_vendedor/compra-card/compra-card.component';
import { InvitadoPageComponent } from './menu_invitado/invitado-page/invitado-page.component';
import { NavBarInvitadoComponent } from './menu_invitado/nav-bar-invitado/nav-bar-invitado.component';
import { EditarCompraComponent } from './menu_vendedor/editar-compra/editar-compra.component';

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
    CrearCompraComponent,
    CardProductoCompraComponent,
    VerproductoComponent,
    MonedasComponent,
    AdminPageComponent,
    CrearUsuarioComponent,
    NavBarAdminComponent,
    CrearUsuarioAdminComponent,
    AdministrarUsuariosComponent,
    UserCardComponent,
    UserCardSolicitudComponent,
    AdministrarPostComponent,
    ProductoCardAprovacionComponent,
    ProductoCardReportadaComponent,
    VerProductoAdminComponent,
    MuroVentasComponent,
    MuroComprasComponent,
    ChatsComponent,
    ChatCardComponent,
    ChatPageComponent,
    VerCompraComponent,
    CompraCardComponent,
    InvitadoPageComponent,
    NavBarInvitadoComponent,
    EditarCompraComponent,
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
