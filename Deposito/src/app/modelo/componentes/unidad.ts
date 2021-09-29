import { Regional } from './regional';

export class Unidad {

    id!: Number;
    cuof!: String;
    nombre!: String;
    telefono!: String;
    ubicacion!: String;
    programa!: String;
    subprograma!: String;
    actividadespecifica!: String;
    activo!: Boolean;
    regional: Regional;


    constructor() {
        this.regional = new Regional();
    }
}