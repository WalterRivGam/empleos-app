import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Postulacion } from '../../model/postulacion.model';
import { PostulacionService } from '../../services/postulacion.service';

@Component({
  selector: 'app-formulario-postulacion',
  imports: [FormsModule],
  templateUrl: './formulario-postulacion.html',
  styleUrl: './formulario-postulacion.css',
})
export class FormularioPostulacionComponent {
  postulacion = new Postulacion();

  @Input() idVacante?: number;
  postulacionService = inject(PostulacionService);
  mostrarValidacion: boolean = false;
  @Output() cerrarFormulario = new EventEmitter<void>();

  onSubmit() {
    this.mostrarValidacion = true;
    this.postulacion.idVacante = this.idVacante ?? 0;

    // Validar el formulario antes de enviar
    if (!this.postulacionService.validarPostulacion(this.postulacion)) {
      return;
    }

    console.log('Postulación enviada:', this.postulacion);
  }

  onCerrarFormulario() {
    this.cerrarFormulario.emit();
  }
}
