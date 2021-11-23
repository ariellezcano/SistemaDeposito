import { DetalleCompra } from './detalleCompra';
import { Equipo } from './equipo';

export class DetalleEquipos {
  equipo: Equipo;
  detalle: DetalleCompra;

  constructor() {
    this.equipo = new Equipo();
    this.detalle = new DetalleCompra();
  }
}
