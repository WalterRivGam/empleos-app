import { inject, Injectable } from '@angular/core';
import { Vacante } from '../models/vacante.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Importamos Observable para tipado
import { Contador } from '../../dashboard/models/contador.model';
import { VacantePostulacion } from '../../dashboard/models/postulacion-por-vacante.model';

@Injectable({ providedIn: 'root' })
export class VacanteService {
  private apiVacantesUrl = 'http://localhost:8080/api/vacantes';
  private apiDashboardUrl = 'http://localhost:8080/api/dashboard';

  private http = inject(HttpClient);

  getVacantes(): Observable<Vacante[]> {
    return this.http.get<Vacante[]>(this.apiVacantesUrl);
  }

  getVacante(id: number): Observable<Vacante> {
    const url = `${this.apiVacantesUrl}/${id}`;
    return this.http.get<Vacante>(url);
  }

  getContadores(): Observable<Contador> {
    const url = `${this.apiDashboardUrl}/contadores`;
    return this.http.get<Contador>(url);
  }

  getTop5VacantesPostuladas(): Observable<VacantePostulacion[]> {
    const url = `${this.apiDashboardUrl}/top5postulaciones`;
    return this.http.get<VacantePostulacion[]>(url);
  }

  actualizarVacante(vacante: Vacante): Observable<Vacante> {
    const url = `${this.apiVacantesUrl}/${vacante.id}`;
    return this.http.put<Vacante>(url, vacante, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  agregarVacante(vacante: Vacante): Observable<Vacante> {
    return this.http.post<Vacante>(this.apiVacantesUrl, vacante, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
