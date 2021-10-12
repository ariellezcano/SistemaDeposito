import { Tipocombustible } from './tipocombustible';
import { Tipovehiculo } from './tipovehiculo';
import { Estados } from './estados';
import { Unidad } from './unidad';

export class Movil {
    id!: number;
    titular!: string;
    dominio!: string;
    motornum!: string;
    chasisnum!: string;
    numInventario!: number;
    identificacionPol!: string;
    observaciones!: string;
    año!: number;
    activo!: boolean;
    vehiculo!: string;
    tipoVehiculo!: Tipovehiculo;
    modelo!: string;
    estado!: Estados;
    tipoCombustible!: Tipocombustible;
    unidad!: Unidad;

    constructor() {

    }
}