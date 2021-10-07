export class Proveedor{

    id!: Number;
    nombre!: string;//razon social
    responsable!: string;
    direccion!: string; //direccion comercial
    telefono!: string;
    Celular!:string;
    correo!: string;
    cuit!:string;
    activo: Boolean;
    
    constructor(){
     this.activo=true;
    }
}