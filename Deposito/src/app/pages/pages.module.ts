import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {PagesComponent} from './pages.component';
import {HttpClientModule} from '@angular/common/http'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
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
import { AbmEquipoComponent } from './frm-abm/abm-equipo/abm-equipo.component';
import { ComboProveedorComponent } from './componentes/combo-proveedor/combo-proveedor.component';
import { ComboEstadoComponent } from './componentes/combo-estado/combo-estado.component';
import { ComboModeloEquipoComponent } from './componentes/combo-modelo-equipo/combo-modelo-equipo.component';
import { ComboTipoEquipoComponent } from './componentes/combo-tipo-equipo/combo-tipo-equipo.component';
import { FilMarcaComponent } from './filtros/fil-marca/fil-marca.component';
import { LstModeloComponent } from './lst/lst-modelo/lst-modelo.component';
import { FilModeloComponent } from './filtros/fil-modelo/fil-modelo.component';
import { FilTipoEquipoComponent } from './filtros/fil-tipo-equipo/fil-tipo-equipo.component';
import { LstTipoEquipoComponent } from './lst/lst-tipo-equipo/lst-tipo-equipo.component';
import { AbmTipoEquipoComponent } from './frm-abm/abm-tipo-equipo/abm-tipo-equipo.component';
import { AbmEstadoEquipoComponent } from './frm-abm/abm-estado-equipo/abm-estado-equipo.component';
import { LstEstadoEquipoComponent } from './lst/lst-estado-equipo/lst-estado-equipo.component';
import { FilEstadoEquipoComponent } from './filtros/fil-estado-equipo/fil-estado-equipo.component';
import { FilProveedorComponent } from './filtros/fil-proveedor/fil-proveedor.component';
import { LstProveedorComponent } from './lst/lst-proveedor/lst-proveedor.component';
import { LstEquipoComponent } from './lst/lst-equipo/lst-equipo.component';
import { FilEquipoComponent } from './filtros/fil-equipo/fil-equipo.component';
import { LstEntregaEquipoUnidadComponent } from './lst/lst-entrega-equipo-unidad/lst-entrega-equipo-unidad.component';
import { AbmEntregaEquipoUnidadComponent } from './frm-abm/abm-entrega-equipo-unidad/abm-entrega-equipo-unidad.component';
import { FilEntregaEquipoUnidadComponent } from './filtros/fil-entrega-equipo-unidad/fil-entrega-equipo-unidad.component';
import { FiltrounidadComponent } from './filtros/filtrounidad/filtrounidad.component';
import { FiltroEquipoComponent } from './filtros/filtro-equipo/filtro-equipo.component';
import { FilPersonaComponent } from './filtros/fil-persona/fil-persona.component';
import { FilMovilComponent } from './filtros/fil-movil/fil-movil.component';
import { ReportesComponent } from './componentes/reportes/reportes.component';
import { LstHitorialEquipoComponent } from './lst/lst-hitorial-equipo/lst-hitorial-equipo.component';
import { FilHistorialEquipoComponent } from './filtros/fil-historial-equipo/fil-historial-equipo.component';
import { ActaEntregaComponent } from './componentes/acta-entrega/acta-entrega.component';
import { GraficoComponent } from './componentes/grafico/grafico.component';

@NgModule({
    declarations:[
        PagesComponent,
        SidebarComponent,
        NavComponent,
        FooterComponent,
        WgCargandoComponent,
        WgPaginateComponent,
        LstMarcaComponent,
        AbmMarcaComponent,
        AbmModeloComponent,
        ComboModeloComponent,
        AbmProveedorComponent,
        AbmEquipoComponent,
        ComboProveedorComponent,
        ComboEstadoComponent,
        ComboModeloEquipoComponent,
        ComboTipoEquipoComponent,
        FilMarcaComponent,
        LstModeloComponent,
        FilModeloComponent,
        FilTipoEquipoComponent,
        LstTipoEquipoComponent,
        AbmTipoEquipoComponent,
        AbmEstadoEquipoComponent,
        LstEstadoEquipoComponent,
        FilEstadoEquipoComponent,
        FilProveedorComponent,
        LstProveedorComponent,
        LstEquipoComponent,
        FilEquipoComponent,
        LstEntregaEquipoUnidadComponent,
        AbmEntregaEquipoUnidadComponent,
        FilEntregaEquipoUnidadComponent,
        FiltrounidadComponent,
        FiltroEquipoComponent,
        FilPersonaComponent,
        FilMovilComponent,
        ReportesComponent,
        LstHitorialEquipoComponent,
        FilHistorialEquipoComponent,
        ActaEntregaComponent,
        GraficoComponent,
    ], 
    exports: [
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