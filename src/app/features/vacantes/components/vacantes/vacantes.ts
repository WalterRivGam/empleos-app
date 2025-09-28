import { Component, EventEmitter, inject, Output } from '@angular/core';
import { VacanteComponent } from '../vacante/vacante';
import { Vacante } from '../../models/vacante.model';
import { VacanteService } from '../../services/vacante.service';

@Component({
  selector: 'app-vacantes',
  imports: [VacanteComponent],
  templateUrl: './vacantes.html',
  styleUrl: './vacantes.css',
})
export class VacantesComponent {
  private vacanteService = inject(VacanteService);

  get vacantes(): Vacante[] {
    return this.vacanteService.getVacantes();
  }

  @Output() seleccionVacante = new EventEmitter<number>();

  onVacanteSeleccionada(id: number) {
    this.seleccionVacante.emit(id);
  }
}
