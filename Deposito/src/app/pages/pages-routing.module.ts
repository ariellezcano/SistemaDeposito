import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { Routes, RouterModule} from '@angular/router'
import { LstPersonaComponent } from "./componentes/listados/lst-persona/lst-persona.component";
import { AbmPersonaComponent } from "./componentes/formulario/abm-persona/abm-persona.component";

const routes: Routes = [
    {
        path: "", component: PagesComponent, children: [
        {path: "persona", component: LstPersonaComponent}, 
         {path: "abm", component: AbmPersonaComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],


})
export class PagesRoutingModule {}