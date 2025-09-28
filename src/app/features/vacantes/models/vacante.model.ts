export interface Vacante {
    id: number;
    titulo: string;
    descripcion: string;
    ubicacion: string;
    salario_opc: number | null;
    fecha_publicacion: string;
    fecha_vencimiento: string;
    estado: string;
    created_at: string;
    updated_at: string;
  }