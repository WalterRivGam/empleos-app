import { Component, EventEmitter, Input, Output } from '@angular/core';
import { type Vacante } from '../../models/vacante.model';

@Component({
  selector: 'app-vacante',
  imports: [],
  templateUrl: './vacante.html',
  styleUrl: './vacante.css',
})
export class VacanteComponent {
  @Input() vacante!: Vacante;
  @Output() seleccionVacante = new EventEmitter<number>();

  onVacanteSeleccionada() {
    this.seleccionVacante.emit(this.vacante.id);
  }
}
