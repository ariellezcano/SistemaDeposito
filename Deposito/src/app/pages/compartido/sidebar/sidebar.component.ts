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
  { path: 'nombre/path', title: 'link 3',  icon:'location_map-big', class: '' },
  { path: 'nombre/path', title: 'link 4',  icon:'ui-1_bell-53', class: '' },

  { path: 'nombre/path', title: 'link 5',  icon:'users_single-02', class: '' },
  { path: 'nombre/path', title: 'link 6',  icon:'design_bullet-list-67', class: '' },
  { path: 'nombre/path', title: 'link 7',  icon:'text_caps-small', class: '' },
  { path: 'nombre/path', title: 'link 8',  icon:'objects_spaceship', class: '' }

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
