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
import { LstModeloComponent } from './lst/lst-modelo/lst-modelo.component';
import { AbmModeloComponent } from './frm-abm/abm-modelo/abm-modelo.component';
import { ComboModeloComponent } from './componentes/combo-modelo/combo-modelo.component';
import { LstProveedorComponent } from './lst/lst-proveedor/lst-proveedor.component';
import { AbmProveedorComponent } from './frm-abm/abm-proveedor/abm-proveedor.component';
import { AbmTipoEquipamientoComponent } from './frm-abm/abm-tipo-equipamiento/abm-tipo-equipamiento.component';
import { LstTipoequipamientoComponent } from './lst/lst-tipoequipamiento/lst-tipoequipamiento.component';
import { ComboTipoequipamientoComponent } from './componentes/combo-tipoequipamiento/combo-tipoequipamiento.component';
import { LstEstadoEquipoComponent } from './lst/lst-estado-equipo/lst-estado-equipo.component';
import { AbmEstadoEquipoComponent } from './frm-abm/abm-estado-equipo/abm-estado-equipo.component';
import { LstEquipoComponent } from './lst/lst-equipo/lst-equipo.component';
import { AbmEquipoComponent } from './frm-abm/abm-equipo/abm-equipo.component';

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
        LstModeloComponent,
        AbmModeloComponent,
        ComboModeloComponent,
        LstProveedorComponent,
        AbmProveedorComponent,
        AbmTipoEquipamientoComponent,
        LstTipoequipamientoComponent,
        ComboTipoequipamientoComponent,
        LstEstadoEquipoComponent,
        AbmEstadoEquipoComponent,
        LstEquipoComponent,
        AbmEquipoComponent,
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