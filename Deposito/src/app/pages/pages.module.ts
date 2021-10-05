import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {PagesComponent} from './pages.component';
import {HttpClientModule} from '@angular/common/http'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { FilPersonaComponent } from './filtros/fil-persona/fil-persona.component';
import { LstPersonaComponent } from './lst/lst-persona/lst-persona.component';
import { AbmPersonaComponent } from './frm-abm/abm-persona/abm-persona.component';
import { SidebarComponent } from './compartido/sidebar/sidebar.component';
import { FooterComponent } from './compartido/footer/footer.component';
import { NavComponent } from './compartido/nav/nav.component';
import { WgCargandoComponent } from './wg-cargando/wg-cargando.component';
import { WgPaginateComponent } from './wg-paginate/wg-paginate.component';
import { LstMarcaComponent } from './lst/lst-marca/lst-marca.component';
import { AbmMarcaComponent } from './frm-abm/abm-marca/abm-marca.component';
import { AbmModeloComponent } from './frm-abm/abm-modelo/abm-modelo.component';
import { ComboModeloComponent } from './componentes/combo-modelo/combo-modelo.component';
import { AbmProveedorComponent } from './frm-abm/abm-proveedor/abm-proveedor.component';
import { AbmTipoEquipamientoComponent } from './frm-abm/abm-tipo-equipamiento/abm-tipo-equipamiento.component';
import { AbmEstadoEquipoComponent } from './frm-abm/abm-estado-equipo/abm-estado-equipo.component';
import { AbmEquipoComponent } from './frm-abm/abm-equipo/abm-equipo.component';
import { ComboProveedorComponent } from './componentes/combo-proveedor/combo-proveedor.component';
import { ComboEstadoComponent } from './componentes/combo-estado/combo-estado.component';
import { ComboModeloEquipoComponent } from './componentes/combo-modelo-equipo/combo-modelo-equipo.component';
import { ComboTipoEquipoComponent } from './componentes/combo-tipo-equipo/combo-tipo-equipo.component';
import { FilMarcaComponent } from './filtros/fil-marca/fil-marca.component';

@NgModule({
    declarations:[
        PagesComponent,
        SidebarComponent,
        FilPersonaComponent,
        LstPersonaComponent,
        AbmPersonaComponent,
        NavComponent,
        FooterComponent,
        WgCargandoComponent,
        WgPaginateComponent,
        LstMarcaComponent,
        AbmMarcaComponent,
        AbmModeloComponent,
        ComboModeloComponent,
        AbmProveedorComponent,
        AbmTipoEquipamientoComponent,
        AbmEstadoEquipoComponent,
        AbmEquipoComponent,
        ComboProveedorComponent,
        ComboEstadoComponent,
        ComboModeloEquipoComponent,
        ComboTipoEquipoComponent,
        FilMarcaComponent,
    ], 
    exports: [
        AbmTipoEquipamientoComponent,
    ],
    imports:[
        BrowserModule,
        FormsModule,
        HttpClientModule, 
        PagesRoutingModule
    ],
    providers: [],
    bootstrap:[PagesComponent],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]

})
export class PagesModule { }