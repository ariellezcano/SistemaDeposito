import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  // { path: 'tipoEquipamiento', title: 'Tipo Equipamiento',  icon: 'design_app', class: '' },
  {
    path: 'marca',
    title: 'Listado de Marcas',
    icon: 'education_atom',
    class: '',
  },
  {
    path: 'modelo',
    title: 'Listado de Modelos',
    icon: 'location_map-big',
    class: '',
  },
  {
    path: 'tipoEquipo',
    title: 'Listado de tipos de equipos',
    icon: 'ui-1_bell-53',
    class: '',
  },
  {
    path: 'estadoequipo',
    title: 'Listado de Estados',
    icon: 'users_single-02',
    class: '',
  },
  {
    path: 'proveedor',
    title: 'Listado de Proveedores',
    icon: 'design_bullet-list-67',
    class: '',
  },
  {
    path: 'equipo',
    title: 'Listado de equipos',
    icon: 'text_caps-small',
    class: '',
  },
  // entrega equipo
  {
    path: 'entregaequipounidad',
    title: 'Listado de equipos entregados',
    icon: 'text_caps-small',
    class: '',
  },
  //orden de compra de equipos
  {
    path: 'ordenCompra',
    title: 'Listado de Compras',
    icon: 'text_caps-small',
    class: '',
  },
  //historial de equipo
  {
    path: 'historial',
    title: 'Historial de equipos entregados',
    icon: 'text_caps-small',
    class: '',
  },  

  // {
  //   path: 'ordenCompra',
  //   title: 'Orden de Compra',
  //   icon: 'objects_spaceship',
  //   class: '',
  // },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }

  rutas(r: string) {
    this.router.navigateByUrl('/principal/' + r);
  }
}
