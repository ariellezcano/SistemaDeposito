import { Modelo } from "./modelo";

export class TipoEquipamiento{

    id!: Number;
    nombre!: string;
    modelo:Modelo;
    activo!: Boolean;
    

    constructor(){
       this.modelo=new Modelo();
    }
}