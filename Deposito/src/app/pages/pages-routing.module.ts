import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { Routes, RouterModule} from '@angular/router'
import { SidebarComponent } from "./compartido/sidebar/sidebar.component";
import { TipoEquipamientoComponent } from "./lst/tipo-equipamiento/tipo-equipamiento.component";
import { LstMarcaComponent } from "./lst/lst-marca/lst-marca.component";
import { LstModeloComponent } from "./lst/lst-modelo/lst-modelo.component";
import { LstProveedorComponent } from "./lst/lst-proveedor/lst-proveedor.component";
import { LstTipoequipamientoComponent } from "./lst/lst-tipoequipamiento/lst-tipoequipamiento.component";

const routes: Routes = [
    {
        path: "", component: PagesComponent, children: [
        {path: "principal", component: SidebarComponent},
        {path: "principal/tipoEquipamiento", component: LstTipoequipamientoComponent},
        {path: "principal/marca", component: LstMarcaComponent},
        {path: "principal/modelo", component: LstModeloComponent},
        {path: "principal/proveedor", component: LstProveedorComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],


})
export class PagesRoutingModule {}