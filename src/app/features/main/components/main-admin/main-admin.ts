import { Component, inject, ViewChild } from '@angular/core';
import { VacanteService } from '../../../vacantes/services/vacante.service';
import { Vacante } from '../../../vacantes/models/vacante.model';
import { VacantesComponent } from '../../../vacantes/components/vacantes/vacantes';
import { DetalleVacante } from '../../../vacantes/components/detalle-vacante/detalle-vacante';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormularioVacanteComponent } from '../../../vacantes/components/formulario-vacante/formulario-vacante';

@Component({
  selector: 'app-main-admin',
  imports: [
    VacantesComponent,
    DetalleVacante,
    AsyncPipe,
    FormularioVacanteComponent,
  ],
  templateUrl: './main-admin.html',
  styleUrl: './main-admin.css',
})
export class MainAdminComponent {
  private vacanteService = inject(VacanteService);
  idVacanteSeleccionada!: number;
  logueado: boolean = false;
  mostrarFormularioVacante: boolean = false;
  vacante: Vacante = new Vacante();

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

  onAgregarVacante() {
    this.mostrarFormularioVacante = true;
  }

  onCerrarFormularioVacante() {
    this.mostrarFormularioVacante = false;
  }

  onVacanteGuardada() {
    // refrescar lista en app-vacantes
    this.vacantesComp.cargarVacantes();
    // opcional: limpiar detalle
    this.idVacanteSeleccionada = 0;
  }
}
