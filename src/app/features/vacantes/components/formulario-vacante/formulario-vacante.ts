import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Vacante } from '../../models/vacante.model';
import { FormsModule } from '@angular/forms';
import { VacanteService } from '../../services/vacante.service';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner';

@Component({
  selector: 'app-formulario-vacante',
  imports: [FormsModule, SpinnerComponent],
  templateUrl: './formulario-vacante.html',
  styleUrl: './formulario-vacante.css',
})
export class FormularioVacanteComponent {
  @Input() vacante!: Vacante;
  @Output() cerrarFormularioVacante = new EventEmitter<void>();
  @Output() vacanteGuardada = new EventEmitter<void>();
  mostrarValidacion: boolean = false;
  vacanteService = inject(VacanteService);
  cargando = false;

  onCerrarFormulario() {
    this.cerrarFormularioVacante.emit();
  }

  onSubmit() {
    this.mostrarValidacion = true;
    this.cargando = true;

    if (this.vacante.id) {
      this.vacanteService.actualizarVacante(this.vacante).subscribe({
        next: (response) => console.log('Respuesta:', response),
        error: (error) => {
          console.error('Error:', error);
          this.cargando = false;
        },
        complete: () => {
          this.vacanteGuardada.emit();
          this.onCerrarFormulario();
          console.log('Vacante actualizada');
          this.cargando = false;
        },
      });
    } else {
      this.vacanteService.agregarVacante(this.vacante).subscribe({
        next: (response) => console.log('Respuesta:', response),
        error: (error) => {
          console.error('Error:', error);
          this.cargando = false;
        },
        complete: () => {
          this.vacanteGuardada.emit();
          this.onCerrarFormulario();
          console.log('Vacante creada');
          this.cargando = false;
        },
      });
    }
  }
}
