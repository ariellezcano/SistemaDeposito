export class Proveedor{

    id!: Number;
    nombre!: string;//razon social
    responsable!: string;
    direccion!: string; //direccion comercial
    telefono!: string;
    celular!:string;
    correo!: string;
    cuit!:string;
    activo: Boolean;
    
    constructor(){
     this.activo=true;
     this.correo = "";
     this.telefono = "";
     this.celular = "";
    }
}