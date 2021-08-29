export class Inventario {
    inCod: number = 0;
    inBodega?: number;
    inNombre?: string;
    inEstado?: number;
    inStock?: number;
    bodega?: {
        boCod: number;
        boNombre?: string;
        boEstado?: boolean;
    };
    estado?: {
        esCod: number;
        esDescripcion?: string;
    };    
}
