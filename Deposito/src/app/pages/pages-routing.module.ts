import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { Routes, RouterModule} from '@angular/router'
import { SidebarComponent } from "./compartido/sidebar/sidebar.component";
import { LstMarcaComponent } from "./lst/lst-marca/lst-marca.component";
import { AbmMarcaComponent } from "./frm-abm/abm-marca/abm-marca.component";
import { AbmModeloComponent } from "./frm-abm/abm-modelo/abm-modelo.component";
import { LstModeloComponent } from "./lst/lst-modelo/lst-modelo.component";
import { LstTipoEquipoComponent } from "./lst/lst-tipo-equipo/lst-tipo-equipo.component";
import { AbmTipoEquipoComponent } from "./frm-abm/abm-tipo-equipo/abm-tipo-equipo.component";
import { AbmEstadoEquipoComponent } from "./frm-abm/abm-estado-equipo/abm-estado-equipo.component";
import { LstEstadoEquipoComponent } from "./lst/lst-estado-equipo/lst-estado-equipo.component";
import { AbmProveedorComponent } from "./frm-abm/abm-proveedor/abm-proveedor.component";
import { LstProveedorComponent } from "./lst/lst-proveedor/lst-proveedor.component";
import { AbmEquipoComponent } from "./frm-abm/abm-equipo/abm-equipo.component";
import { LstEquipoComponent } from "./lst/lst-equipo/lst-equipo.component";


const routes: Routes = [
    {
        path: "", component: PagesComponent, children: [
        {path: "principal", component: SidebarComponent},
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
    ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],


})
export class PagesRoutingModule {}