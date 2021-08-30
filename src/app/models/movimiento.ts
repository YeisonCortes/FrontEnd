export class Movimiento {
    moCod?: number;
    moProducto: number | undefined;
    moClaseMvto: number | undefined;
    moCantidad: number | undefined;
    moFecha: Date | undefined;
    producto?: {
        inCod: number;
        inNombre?: string;
    };
    clase?: {
        cmCod: number;
        cmDescripcion?: string;
    };   
}