import { Marca } from "./marca";

export class Modelo{

    id!: Number;
    nombre!: string;
    activo!: Boolean;
    marca: Marca;

    constructor(){
       this.marca=new Marca();
       
    }
}