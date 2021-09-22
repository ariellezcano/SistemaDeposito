import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { Routes, RouterModule} from '@angular/router'
import { LstPersonaComponent } from "./lst/lst-persona/lst-persona.component";
import { AbmPersonaComponent } from "./frm-abm/abm-persona/abm-persona.component";
import { SidebarComponent } from "./compartido/sidebar/sidebar.component";

const routes: Routes = [
    {
        path: "", component: PagesComponent, children: [
        {path: "principal", component: SidebarComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],


})
export class PagesRoutingModule {}