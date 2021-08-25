import { Proveedor } from "./proveedor";

export class OrdenCompra{

    id!: Number;
    nroOrden!: string;
    activo!: Boolean;
    proveedor: Proveedor;

    constructor(){
       this.proveedor=new Proveedor();
       
    }
}