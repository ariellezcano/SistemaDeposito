import { Equipo } from "./equipo";
import { Persona } from "./persona";
import { Unidad } from "./unidad";

export class EntregaEquipoUnidades{
    id!: number;
    nroNota!: string;
    equipo!: Equipo;
    unidad!: Unidad;
    recibe!: Persona;
    entrega!: Persona;
    fechaEntrega!: any;
    fechaRecepcion!: any;
    observaciones!: string;
    activo: boolean;

    constructor(){
        this.recibe = new Persona;
        this.entrega = new Persona;
        this.equipo = new Equipo;
        this.unidad = new Unidad;
        this.fechaEntrega = new Date;
        this.activo = true;
    }
}