export class Postulacion {
  idVacante: number;
  nombre: string;
  email: string;
  telefono: string;
  comentario: string;
  archivo: File | null;

  constructor() {
    this.idVacante = 0;
    this.nombre = '';
    this.email = '';
    this.telefono = '';
    this.comentario = '';
    this.archivo = null;
  }
}
