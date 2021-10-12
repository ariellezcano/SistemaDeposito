import { DatoPolicial } from "./datoPolicial";
import { Equipo } from "./equipo";
import { Movil } from "./movil";
import { Persona } from "./persona";
import { Unidad } from "./unidad";
import { Vehiculo } from "./vehiculo";

export class EntregaEquipoUnidades{
    id!: number;
    nroNota!: string;
    equipo!: Equipo;
    unidad!: Unidad;
    recibe!: DatoPolicial;
    entrega!: Persona;
    fechaEntrega!: any;
    fechaRecepcion!: any;
    observaciones!: string;
    tipoEntrega!: string;
    movilPol!: Vehiculo; 
    activo: boolean;

    constructor(){
        this.recibe = new DatoPolicial();
        this.entrega = new Persona();
        this.equipo = new Equipo();
        this.unidad = new Unidad();
        this.fechaEntrega = new Date();
        this.movilPol = new Vehiculo();
        this.activo = true;
    }
}