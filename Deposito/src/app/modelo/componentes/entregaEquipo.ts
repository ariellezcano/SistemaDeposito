import { Equipo } from "./equipo";
import { Persona } from "./persona";
import { Unidad } from "./unidad";

export class EntregaEquipo{
    id!: number;
    nroOrden!: string;
    equipo!: Equipo;
    unidad!: Unidad;
    personalRecibe!: Persona;
    personalEntrega!: Persona;
    fechaEntrega!: Date;
    fechaDevolucion!: Date;
    observaciones!: string;
    activo!: boolean;

    constructor(){
        this.personalRecibe = new Persona;
        this.personalEntrega = new Persona;
        this.equipo = new Equipo;
        this.unidad = new Unidad;
        this.fechaEntrega = new Date;
        this.fechaDevolucion = new Date;
        }
}