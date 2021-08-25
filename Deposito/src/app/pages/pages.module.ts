import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {PagesComponent} from './pages.component';
import {HttpClientModule} from '@angular/common/http'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { FilPersonaComponent } from './componentes/Filtro/fil-persona/fil-persona.component';
import { LstPersonaComponent } from './componentes/listados/lst-persona/lst-persona.component';
import { AbmPersonaComponent } from './componentes/formulario/abm-persona/abm-persona.component';

@NgModule({
    declarations:[
        PagesComponent,
        FilPersonaComponent,
        LstPersonaComponent,
        AbmPersonaComponent
    ], 
    exports: [],
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