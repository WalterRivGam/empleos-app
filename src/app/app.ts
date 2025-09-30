import { Component, inject } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header';
import { VacanteService } from './features/vacantes/services/vacante.service';
import { Vacante } from './features/vacantes/models/vacante.model';
import { MenuComponent } from './features/menu/components/menu/menu';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, MenuComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  private vacanteService = inject(VacanteService);
  idVacanteSeleccionada!: number;
  logueado: boolean = false;

  get vacante() {
    return (
      this.vacanteService.getVacante(this.idVacanteSeleccionada) ??
      new Vacante()
    );
  }

  onVacanteSeleccionada(id: number) {
    this.idVacanteSeleccionada = id;
  }
}
