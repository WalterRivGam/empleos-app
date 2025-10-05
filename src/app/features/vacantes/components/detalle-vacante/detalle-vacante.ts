import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Vacante } from '../../models/vacante.model';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { FormularioPostulacionComponent } from '../../../postulaciones/components/formulario-postulacion/formulario-postulacion';
import { FormularioVacanteComponent } from '../formulario-vacante/formulario-vacante';
import { VacanteService } from '../../services/vacante.service';

@Component({
  selector: 'app-detalle-vacante',
  imports: [
    CurrencyPipe,
    DatePipe,
    FormularioPostulacionComponent,
    FormularioVacanteComponent,
  ],
  templateUrl: './detalle-vacante.html',
  styleUrl: './detalle-vacante.css',
})
export class DetalleVacante {
  @Input() vacante!: Vacante;
  @Input() logueado: boolean = false;
  mostrarFormularioPostulacion: boolean = false;
  mostrarFormularioVacante: boolean = false;
  vacanteService = inject(VacanteService);
  @Output() vacanteInactivada = new EventEmitter<void>();
  postulacionExitosa = false;
  @Output() vacanteGuardada = new EventEmitter<void>();

  onPostular() {
    this.mostrarFormularioPostulacion = true;
  }

  onCerrarFormularioPostulacion() {
    this.mostrarFormularioPostulacion = false;
  }

  onEditar() {
    this.mostrarFormularioVacante = true;
  }

  onCerrarFormularioVacante() {
    this.mostrarFormularioVacante = false;
  }

  onInactivar() {
    this.vacante.estado = 'expirada';
    this.vacanteService.actualizarVacante(this.vacante).subscribe({
      next: (res) => this.vacanteInactivada.emit(),
      error: (err) => console.error('Error', err),
    });
  }

  onPostulacionExitosa() {
    this.postulacionExitosa = true;
  }

  onCerrarModal() {
    this.postulacionExitosa = false;
  }

  onVacanteGuardada() {
    this.vacanteGuardada.emit();
  }

  onCerrarMensajeExito() {
    this.postulacionExitosa = false;
  }
}
