import { Component, OnInit } from '@angular/core';


declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: 'tipoEquipamiento', title: 'Tipo Equipamiento',  icon: 'design_app', class: '' },
  { path: 'marca', title: 'marca',  icon:'education_atom', class: '' },
  { path: 'modelo', title: 'modelo',  icon:'location_map-big', class: '' },
  { path: 'proveedor', title: 'proveedor',  icon:'ui-1_bell-53', class: '' },

  { path: 'estado', title: 'Estado',  icon:'users_single-02', class: '' },
  { path: 'equipo', title: 'Equipo',  icon:'design_bullet-list-67', class: '' },
  { path: 'detalle', title: 'Detalle de Compra',  icon:'text_caps-small', class: '' },
  { path: 'ordenCompra', title: 'Orden de Compra',  icon:'objects_spaceship', class: '' }

];

@Component({
selector: 'app-sidebar',
templateUrl: './sidebar.component.html',
styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];

constructor() { }

ngOnInit() {
  this.menuItems = ROUTES.filter(menuItem => menuItem);
}
isMobileMenu() {
    if ( window.innerWidth > 991) {
        return false;
    }
    return true;
};
}
