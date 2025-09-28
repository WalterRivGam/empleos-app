import { Injectable } from '@angular/core';
import { DUMMY_VACANTES } from '../data/dummy-vacantes';

@Injectable({ providedIn: 'root' })
export class VacanteService {
  getVacantes() {
    return DUMMY_VACANTES.filter((v) => v.estado === 'activa');
  }

  getVacante(id: number) {
    return DUMMY_VACANTES.find((v) => v.id === id);
  }
}
