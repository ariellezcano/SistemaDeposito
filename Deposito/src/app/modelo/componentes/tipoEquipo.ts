export class TipoEquipo {
  id!: Number;
  nombre!: string;
  activo: Boolean;
  constructor() {
    this.activo = true;
   }
}