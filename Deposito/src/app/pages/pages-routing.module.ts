import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { Routes, RouterModule} from '@angular/router'
import { SidebarComponent } from "./compartido/sidebar/sidebar.component";
import { LstMarcaComponent } from "./lst/lst-marca/lst-marca.component";
import { LstModeloComponent } from "./lst/lst-modelo/lst-modelo.component";
import { LstProveedorComponent } from "./lst/lst-proveedor/lst-proveedor.component";
import { LstTipoequipamientoComponent } from "./lst/lst-tipoequipamiento/lst-tipoequipamiento.component";
import { LstEstadoEquipoComponent } from "./lst/lst-estado-equipo/lst-estado-equipo.component";
import { LstEquipoComponent } from "./lst/lst-equipo/lst-equipo.component";
import { DetalleCompra } from "../modelo/index.models";
import { DetalleCompraComponent } from "./lst/detalle-compra/detalle-compra.component";
import { OrdenCompraComponent } from "./lst/orden-compra/orden-compra.component";

const routes: Routes = [
    {
        path: "", component: PagesComponent, children: [
        {path: "principal", component: SidebarComponent},
        {path: "principal/tipoEquipamiento", component: LstTipoequipamientoComponent},
        {path: "principal/marca", component: LstMarcaComponent},
        {path: "principal/modelo", component: LstModeloComponent},
        {path: "principal/proveedor", component: LstProveedorComponent},
        {path: "principal/estado", component: LstEstadoEquipoComponent},
        {path: "principal/equipo", component: LstEquipoComponent},
        {path: "principal/detalle", component: DetalleCompraComponent},
        {path: "principal/ordenCompra", component: OrdenCompraComponent},   
    ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],


})
export class PagesRoutingModule {}