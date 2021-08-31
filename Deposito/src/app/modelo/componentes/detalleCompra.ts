import { OrdenCompra } from "./ordenCompra";
import { TipoEquipamiento } from "./tipoEquipamiento";

export class DetalleCompra{

    id!: Number;
    ordenCompra: OrdenCompra;
    tipoEquipamiento: TipoEquipamiento;
    CantidadCompra!: number;
    cantidadIngreso!:number;
    observaciones!: string;
    activo!: Boolean;
    

    constructor(){
       this.tipoEquipamiento=new TipoEquipamiento();
       this.ordenCompra=new OrdenCompra();
      
    }
}