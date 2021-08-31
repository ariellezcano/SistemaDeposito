import { Modelo } from "./modelo";

export class TipoEquipamiento{

    id!: Number;
    nombre!: string;
    activo!: Boolean;
    modelo:Modelo;

    constructor(){
       this.modelo=new Modelo();
    }
}