import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';
import { SidebarComponent } from './compartido/sidebar/sidebar.component';
import { LstMarcaComponent } from './lst/lst-marca/lst-marca.component';
import { AbmMarcaComponent } from './frm-abm/abm-marca/abm-marca.component';
import { AbmModeloComponent } from './frm-abm/abm-modelo/abm-modelo.component';
import { LstModeloComponent } from './lst/lst-modelo/lst-modelo.component';
import { LstTipoEquipoComponent } from './lst/lst-tipo-equipo/lst-tipo-equipo.component';
import { AbmTipoEquipoComponent } from './frm-abm/abm-tipo-equipo/abm-tipo-equipo.component';
import { AbmEstadoEquipoComponent } from './frm-abm/abm-estado-equipo/abm-estado-equipo.component';
import { LstEstadoEquipoComponent } from './lst/lst-estado-equipo/lst-estado-equipo.component';
import { AbmProveedorComponent } from './frm-abm/abm-proveedor/abm-proveedor.component';
import { LstProveedorComponent } from './lst/lst-proveedor/lst-proveedor.component';
import { AbmEquipoComponent } from './frm-abm/abm-equipo/abm-equipo.component';
import { LstEquipoComponent } from './lst/lst-equipo/lst-equipo.component';
import { AbmEntregaEquipoUnidadComponent } from './frm-abm/abm-entrega-equipo-unidad/abm-entrega-equipo-unidad.component';
import { LstEntregaEquipoUnidadComponent } from './lst/lst-entrega-equipo-unidad/lst-entrega-equipo-unidad.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import { LstHitorialEquipoComponent } from './lst/lst-hitorial-equipo/lst-hitorial-equipo.component';
import { LstOrdenCOmpraComponent } from './lst/lst-orden-compra/lst-orden-compra.component';
import { AbmOrdenCompraComponent } from './frm-abm/abm-orden-compra/abm-orden-compra.component';
import { LstDetalleCompraComponent } from './lst/lst-detalle-compra/lst-detalle-compra.component';
import { AbmDetalleCompraComponent } from './frm-abm/abm-detalle-compra/abm-detalle-compra.component';
import { AbmDetalleEquipoComponent } from './frm-abm/abm-detalle-equipo/abm-detalle-equipo.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'principal', component: SidebarComponent },
      {
        path: 'principal/marca',
        children: [
          {
            path: 'abm/:id',
            component: AbmMarcaComponent,
          },
          {
            path: '',
            component: LstMarcaComponent,
          },
        ],
      },
      {
        path: 'principal/modelo',
        children: [
          {
            path: 'abm/:id',
            component: AbmModeloComponent,
          },
          {
            path: '',
            component: LstModeloComponent,
          },
        ],
      },
      {
        path: 'principal/tipoEquipo',
        children: [
          {
            path: 'abm/:id',
            component: AbmTipoEquipoComponent,
          },
          {
            path: '',
            component: LstTipoEquipoComponent,
          },
        ],
      },
      {
        path: 'principal/proveedor',
        children: [
          {
            path: 'abm/:id',
            component: AbmProveedorComponent,
          },
          {
            path: '',
            component: LstProveedorComponent,
          },
        ],
      },
      {
        path: 'principal/equipo',
        children: [
          {
            path: 'abm/:id',
            component: AbmEquipoComponent,
          },
          {
            path: '',
            component: LstEquipoComponent,
          },
        ],
      },
      {
        path: 'principal/estadoequipo',
        children: [
          {
            path: 'abm/:id',
            component: AbmEstadoEquipoComponent,
          },
          {
            path: '',
            component: LstEstadoEquipoComponent,
          },
        ],
      },
      {
        path: 'principal/entregaequipounidad',
        children: [
          {
            path: 'abm/:id',
            component: AbmEntregaEquipoUnidadComponent,
          },
          {
            path: '',
            component: LstEntregaEquipoUnidadComponent,
          },
        ],
      },
      {
        path: 'principal/historial',
        children: [
          {
            path: '',
            component: LstHitorialEquipoComponent,
          },
        ],
      },
      {
        path: 'principal/ordenCompra',
        children: [
          {
            path: 'abm/:id',
            component: AbmOrdenCompraComponent,
          },
          {
            path: '',
            component: LstOrdenCOmpraComponent,
          },
        ],
      },
      {
        path: 'principal/detallecompra',
        children: [
          {
            path: 'abm/:id',
            component: AbmDetalleCompraComponent,
          },
        ],
      },
      {
        path: 'principal/detalleequipo',
        children: [
          {
            path: 'abm/:id',
            component: AbmDetalleEquipoComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
