import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { VacanteComponent } from '../vacante/vacante';
import { Vacante } from '../../models/vacante.model';
import { VacanteService } from '../../services/vacante.service';

@Component({
  selector: 'app-vacantes',
  imports: [VacanteComponent],
  templateUrl: './vacantes.html',
  styleUrl: './vacantes.css',
})
export class VacantesComponent implements OnInit {
  private vacanteService = inject(VacanteService);
  vacantes: Vacante[] = [];

  @Output() seleccionVacante = new EventEmitter<number>();

  ngOnInit() {
    this.cargarVacantes();
  }

  cargarVacantes() {
    this.vacanteService.getVacantes().subscribe((data) => {
      this.vacantes = data;
    });
  }

  onVacanteSeleccionada(id: number) {
    this.seleccionVacante.emit(id);
  }
}
