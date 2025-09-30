import { inject, Injectable } from '@angular/core';
import { Vacante } from '../models/vacante.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Importamos Observable para tipado

@Injectable({ providedIn: 'root' })
export class VacanteService {
  // Nota: Considera usar un servicio de entorno para 'http://localhost:8080/api/vacantes'
  private apiUrl = 'http://localhost:8080/api/vacantes';

  private http = inject(HttpClient);

  getVacantes(): Observable<Vacante[]> {
    return this.http.get<Vacante[]>(this.apiUrl);
  }

  getVacante(id: number): Observable<Vacante> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Vacante>(url);
  }

  actualizarVacante(vacante: Vacante): Observable<Vacante> {
    const url = `${this.apiUrl}/${vacante.id}`;
    return this.http.put<Vacante>(url, vacante, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  agregarVacante(vacante: Vacante): Observable<Vacante> {
    return this.http.post<Vacante>(this.apiUrl, vacante, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
