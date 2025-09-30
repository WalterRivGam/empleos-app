import { inject, Injectable } from '@angular/core';
import { Postulacion } from '../model/postulacion.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PostulacionService {
  private apiUrl = 'http://localhost:8080/api/postulaciones';

  private http = inject(HttpClient);

  validarPostulacion(postulacion: Postulacion): boolean {
    return (
      postulacion.nombre.trim().length > 0 &&
      postulacion.email.trim().length > 0 &&
      postulacion.archivo !== null
    );
  }

  agregarPostulacion(postulacion: Postulacion) {
    const formData = new FormData();
    formData.append('nombre', postulacion.nombre);
    formData.append('email', postulacion.email);
    formData.append('telefono', postulacion.telefono);
    formData.append('comentario', postulacion.comentario);
    formData.append('idVacante', postulacion.idVacante.toString());
    if (postulacion.archivo) {
      formData.append('archivo', postulacion.archivo);
    }
    console.log('Enviando postulacion:', postulacion);
    return this.http.post(this.apiUrl, formData);
  }
}
