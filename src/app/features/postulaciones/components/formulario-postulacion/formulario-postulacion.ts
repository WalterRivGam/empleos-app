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
  @Output() cerrarFormularioPostulacion = new EventEmitter<void>();
  mostrarErrorArchivo = false;
  mensajeErrorArchivo = '';
  @Output() postulacionExitosa = new EventEmitter<void>();

  onSubmit() {
    this.mostrarValidacion = true;
    this.postulacion.idVacante = this.idVacante ?? 0;

    // Validar el formulario antes de enviar
    if (!this.postulacionService.validarPostulacion(this.postulacion)) {
      return;
    }

    this.postulacionService.agregarPostulacion(this.postulacion).subscribe({
      next: (response) => {
        console.log('Respuesta:', response);
        this.postulacionExitosa.emit();
        this.onCerrarFormulario();
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => console.log('completado'),
    });
  }

  onFileChange(event: Event): void {
    this.mostrarErrorArchivo = false;
    this.mensajeErrorArchivo = '';

    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const maxSizeMB = 2;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    if (file.size > maxSizeBytes) {
      this.mostrarErrorArchivo = true;
      this.mensajeErrorArchivo = 'El archivo excede los 2 MB permitidos.';
      input.value = '';
      return;
    }

    if (file.type !== 'application/pdf') {
      this.mostrarErrorArchivo = true;
      this.mensajeErrorArchivo = 'Solo se permiten archivos PDF.';
      input.value = '';
      return;
    }

    this.postulacion.archivo = input.files[0];
  }

  onCerrarFormulario() {
    this.cerrarFormularioPostulacion.emit();
  }
}
