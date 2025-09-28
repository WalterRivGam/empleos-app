import { Injectable } from '@angular/core';
import { Postulacion } from '../model/postulacion.model';

@Injectable({ providedIn: 'root' })
export class PostulacionService {
  validarPostulacion(postulacion: Postulacion): boolean {
    return (
      postulacion.nombre.trim().length > 0 &&
      postulacion.email.trim().length > 0 &&
      postulacion.archivo !== null
    );
  }
}
