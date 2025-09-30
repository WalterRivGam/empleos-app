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

  onSubmit() {
    this.mostrarValidacion = true;
    this.postulacion.idVacante = this.idVacante ?? 0;

    // Validar el formulario antes de enviar
    if (!this.postulacionService.validarPostulacion(this.postulacion)) {
      return;
    }

    this.postulacionService.agregarPostulacion(this.postulacion).subscribe({
      next: (response) => console.log('Respuesta:', response),
      error: (error) => console.error('Error:', error),
      complete: () => console.log('Completado'),
    });
    this.onCerrarFormulario();
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.postulacion.archivo = event.target.files[0];
    }
  }

  onCerrarFormulario() {
    this.cerrarFormularioPostulacion.emit();
  }
}
