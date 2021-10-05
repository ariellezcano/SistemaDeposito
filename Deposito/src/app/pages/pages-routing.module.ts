import { NgModule } from "@angular/core";
import { PagesComponent } from "./pages.component";
import { Routes, RouterModule} from '@angular/router'
import { SidebarComponent } from "./compartido/sidebar/sidebar.component";
import { LstMarcaComponent } from "./lst/lst-marca/lst-marca.component";
import { AbmMarcaComponent } from "./frm-abm/abm-marca/abm-marca.component";


const routes: Routes = [
    {
        path: "", component: PagesComponent, children: [
        {path: "principal", component: SidebarComponent},
        {
            path: 'marca',
            children: [
              {
                path: 'abm/:id',
                component: AbmMarcaComponent,
              },
              {
                path: 'lst',
                component: LstMarcaComponent,
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