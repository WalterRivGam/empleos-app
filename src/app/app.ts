import { Component, inject } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header';
import { VacantesComponent } from './features/vacantes/components/vacantes/vacantes';
import { DetalleVacante } from './features/vacantes/components/detalle-vacante/detalle-vacante';
import { Vacante } from './features/vacantes/models/vacante.model';
import { VacanteService } from './features/vacantes/services/vacante.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, VacantesComponent, DetalleVacante],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  private vacanteService = inject(VacanteService);
  idVacanteSeleccionada!: number;

  get vacante() {
    return this.vacanteService.getVacante(this.idVacanteSeleccionada);
  }

  onVacanteSeleccionada(id: number) {
    this.idVacanteSeleccionada = id;
  }
}
