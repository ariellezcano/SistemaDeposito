import {Persona} from "./persona"
export class Proveedor{

    id!: Number;
    nombre!: string;//razon social
    responsable!: string;
    persona: Persona;
    direccion!: string; //direccion comercial
    telefono!: string;
    Celular!:string;
    correo!: string;
    activo!: Boolean;
    cuit!:string;

    constructor(){
       this.persona=new Persona();
    }
}