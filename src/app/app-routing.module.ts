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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
