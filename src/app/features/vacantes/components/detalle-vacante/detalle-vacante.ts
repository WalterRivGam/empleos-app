import { Component, Input } from '@angular/core';
import { Vacante } from '../../models/vacante.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormularioPostulacionComponent } from '../../../postulaciones/components/formulario-postulacion/formulario-postulacion';

@Component({
  selector: 'app-detalle-vacante',
  imports: [CurrencyPipe, DatePipe, FormularioPostulacionComponent],
  templateUrl: './detalle-vacante.html',
  styleUrl: './detalle-vacante.css',
})
export class DetalleVacante {
  @Input() vacante?: Vacante;
  mostrarFormulario: boolean = false;

  onPostular() {
    this.mostrarFormulario = true;
  }

  onCerrarFormulario() {
    this.mostrarFormulario = false;
  }
}
