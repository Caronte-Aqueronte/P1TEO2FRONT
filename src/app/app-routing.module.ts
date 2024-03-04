import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MenuVendedorPageComponent } from './menu_vendedor/menu-vendedor-page/menu-vendedor-page.component';
import { CrearProductoComponent } from './menu_vendedor/crear-producto/crear-producto.component';
import { CrearTagComponent } from './menu_vendedor/crear-tag/crear-tag.component';

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
    path: 'menu_vendedor',
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
