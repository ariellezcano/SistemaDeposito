import { Marca } from "./marca";

export class Modelo{

    id!: Number;
    nombre!: string;
    marca: Marca;
    activo!: Boolean;

    constructor(){
       this.marca=new Marca();
       
    }
}