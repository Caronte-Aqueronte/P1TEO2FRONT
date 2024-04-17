import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MenuVendedorPageComponent } from './menu_vendedor/menu-vendedor-page/menu-vendedor-page.component';
import { CrearProductoComponent } from './menu_vendedor/crear-producto/crear-producto.component';
import { CrearTagComponent } from './menu_vendedor/crear-tag/crear-tag.component';
import { TusProductosComponent } from './menu_vendedor/tus-productos/tus-productos.component';
import { CrearCompraComponent } from './menu_vendedor/crear-compra/crear-compra.component';
import { VerproductoComponent } from './menu_vendedor/verproducto/verproducto.component';
import { MonedasComponent } from './menu_vendedor/monedas/monedas.component';
import { CrearUsuarioComponent } from './auth/crear-usuario/crear-usuario.component';
import { AdminPageComponent } from './menu_admin/admin-page/admin-page.component';
import { CrearUsuarioAdminComponent } from './menu_admin/crear-usuario-admin/crear-usuario-admin.component';
import { AdministrarUsuariosComponent } from './menu_admin/administrar-usuarios/administrar-usuarios.component';
import { AdministrarPostComponent } from './menu_admin/administrar-post/administrar-post.component';
import { VerProductoAdminComponent } from './menu_admin/ver-producto-admin/ver-producto-admin.component';
import { MuroVentasComponent } from './menu_vendedor/muro-ventas/muro-ventas.component';
import { ChatsComponent } from './menu_vendedor/chats/chats.component';
import { ChatPageComponent } from './menu_vendedor/chat-page/chat-page.component';
import { VerCompraComponent } from './menu_vendedor/ver-compra/ver-compra.component';
import { MuroComprasComponent } from './menu_vendedor/muro-compras/muro-compras.component';
import { InvitadoPageComponent } from './menu_invitado/invitado-page/invitado-page.component';
import { EditarCompraComponent } from './menu_vendedor/editar-compra/editar-compra.component';
import { ContactosPageComponent } from './menu_vendedor/contactos-page/contactos-page.component';
import { CrearVoluntariadoComponent } from './menu_vendedor/crear-voluntariado/crear-voluntariado.component';
import { VoluntariadosPageComponent } from './menu_vendedor/voluntariados-page/voluntariados-page.component';
import { VerVoluntariadoComponent } from './menu_vendedor/ver-voluntariado/ver-voluntariado.component';

const routes: Routes = [
  {
    path: '*',
    component: LoginComponent,
  },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'crear_usuario',
    component: CrearUsuarioComponent,
  },
  {
    path: 'menu_usuarios',
    component: MenuVendedorPageComponent,
    children: [
      {
        path: 'crear_producto',
        component: CrearProductoComponent,
      },
      {
        path: 'tags',
        component: CrearTagComponent,
      },
      {
        path: 'treboles',
        component: MonedasComponent,
      },
      {
        path: 'tus_prductos',
        component: TusProductosComponent,
      },
      {
        path: 'crear_compra',
        component: CrearCompraComponent,
      },
      {
        path: 'tags',
        component: CrearTagComponent,
      },
      {
        path: 'ver_producto/:idProd',
        component: VerproductoComponent,
      },
      {
        path: 'ver_compra/:id',
        component: VerCompraComponent,
      },

      {
        path: 'editar_producto/:id',
        component: EditarCompraComponent,
      },

      {
        path: 'compras',
        component: MuroComprasComponent,
      },
      {
        path: 'muro_productos',
        component: MuroVentasComponent,
      },
      {
        path: 'chats',
        component: ChatsComponent,
      },
      {
        path: 'chat/:id',
        component: ChatPageComponent,
      },
      {
        path: 'contactos',
        component: ContactosPageComponent,
      },
      {
        path: 'crear_voluntariado',
        component: CrearVoluntariadoComponent,
      },
      {
        path: 'voluntariados',
        component: VoluntariadosPageComponent,
      },
      {
        path: 'ver_voluntariado/:id',
        component: VerVoluntariadoComponent,
      },
    ],
  },
  {
    path: 'invitado',
    component: InvitadoPageComponent,
    children: [
      {
        path: 'ver_producto/:idProd',
        component: VerproductoComponent,
      },
      {
        path: 'ver_compra/:id',
        component: VerCompraComponent,
      },
      {
        path: 'compras',
        component: MuroComprasComponent,
      },
      {
        path: 'muro_productos',
        component: MuroVentasComponent,
      }
    ],
  },
  {
    path: 'menu_admin',
    component: AdminPageComponent,
    children: [
      {
        path: 'crear_usuario',
        component: CrearUsuarioAdminComponent,
      },
      {
        path: 'administrar_usuarios',
        component: AdministrarUsuariosComponent,
      },
      {
        path: 'administrar_post',
        component: AdministrarPostComponent,
      },
      {
        path: 'ver_producto/:idProd',
        component: VerProductoAdminComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
