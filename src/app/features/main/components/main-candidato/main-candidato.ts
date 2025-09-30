import { Component, inject, ViewChild } from '@angular/core';
import { VacantesComponent } from '../../../vacantes/components/vacantes/vacantes';
import { DetalleVacante } from '../../../vacantes/components/detalle-vacante/detalle-vacante';
import { VacanteService } from '../../../vacantes/services/vacante.service';
import { Observable } from 'rxjs';
import { Vacante } from '../../../vacantes/models/vacante.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-main',
  imports: [VacantesComponent, DetalleVacante, AsyncPipe],
  templateUrl: './main-candidato.html',
  styleUrl: './main-candidato.css',
})
export class MainCandidatoComponent {
  private vacanteService = inject(VacanteService);

  idVacanteSeleccionada!: number;
  vacante$!: Observable<Vacante>;

  @ViewChild(VacantesComponent) vacantesComp!: VacantesComponent;

  onVacanteSeleccionada(id: number) {
    this.idVacanteSeleccionada = id;
    this.vacante$ = this.vacanteService.getVacante(id);
  }

  onVacanteInactivada() {
    // refrescar lista en app-vacantes
    this.vacantesComp.cargarVacantes();
    // opcional: limpiar detalle
    this.idVacanteSeleccionada = 0;
  }
}
