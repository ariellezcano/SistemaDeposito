import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { Routes, RouterModule} from '@angular/router'
import { SidebarComponent } from "./compartido/sidebar/sidebar.component";
import { TipoEquipamientoComponent } from "./lst/tipo-equipamiento/tipo-equipamiento.component";
import { LstMarcaComponent } from "./lst/lst-marca/lst-marca.component";

const routes: Routes = [
    {
        path: "", component: PagesComponent, children: [
        {path: "principal", component: SidebarComponent},
        {path: "principal/tipoEquipamiento", component: TipoEquipamientoComponent},
        {path: "principal/marca", component: LstMarcaComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],


})
export class PagesRoutingModule {}