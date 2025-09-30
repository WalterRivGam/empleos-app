import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Vacante } from '../../models/vacante.model';
import { FormsModule } from '@angular/forms';
import { VacanteService } from '../../services/vacante.service';

@Component({
  selector: 'app-formulario-vacante',
  imports: [FormsModule],
  templateUrl: './formulario-vacante.html',
  styleUrl: './formulario-vacante.css',
})
export class FormularioVacanteComponent {
  @Input() vacante!: Vacante;
  @Output() cerrarFormularioVacante = new EventEmitter<void>();
  @Output() vacanteGuardada = new EventEmitter<void>();
  mostrarValidacion: boolean = false;
  vacanteService = inject(VacanteService);

  onCerrarFormulario() {
    this.cerrarFormularioVacante.emit();
  }

  onSubmit() {
    this.mostrarValidacion = true;

    if (this.vacante.id) {
      this.vacanteService.actualizarVacante(this.vacante).subscribe({
        next: (response) => console.log('Respuesta:', response),
        error: (error) => console.error('Error:', error),
        complete: () => {
          this.vacanteGuardada.emit();
          this.onCerrarFormulario();
          console.log('Vacante actualizada');
        },
      });
    } else {
      this.vacanteService.agregarVacante(this.vacante).subscribe({
        next: (response) => console.log('Respuesta:', response),
        error: (error) => console.error('Error:', error),
        complete: () => {
          this.vacanteGuardada.emit();
          this.onCerrarFormulario();
          console.log('Vacante creada');
        },
      });
    }
  }
}
