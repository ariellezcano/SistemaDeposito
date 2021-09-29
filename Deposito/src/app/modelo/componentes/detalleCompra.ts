import { Equipo } from "./equipo";
import { OrdenCompra } from "./ordenCompra";
import { Persona } from "./persona";

export class DetalleCompra{

    id!: Number;
    ordenCompra: OrdenCompra;
    CantidadCompra!: number;
    cantidadIngreso!:number;
    observaciones!: string;
    personalRecibe!: Persona;
    fechaRecepcion!: Date;
    equipo!: Equipo;
    activo!: Boolean;
    

    constructor(){
       this.ordenCompra=new OrdenCompra();
       this.personalRecibe = new Persona();
       this.equipo = new Equipo();
      
    }
}