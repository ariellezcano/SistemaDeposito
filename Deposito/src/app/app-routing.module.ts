import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/compartido/login/login.component';
import { ActaEntregaComponent } from './pages/componentes/acta-entrega/acta-entrega.component';
import { ReporteFaltanteComponent } from './pages/componentes/reporte-faltante/reporte-faltante.component';
import { ReportesComponent } from './pages/componentes/reportes/reportes.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'principal/entregaequipounidad/reporte',
    children: [
      {
        path: ':id',
        component: ReportesComponent,
      },
    ],
  },
  {
    path: 'principal/entregaequipounidad/actaentrega',
    children: [
      {
        path: ':id',
        component: ActaEntregaComponent,
      },
    ],
  },
  {
    path: 'principal/detallecompra/reporte',
    children: [
      {
        path: ':id',
        component: ReporteFaltanteComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
