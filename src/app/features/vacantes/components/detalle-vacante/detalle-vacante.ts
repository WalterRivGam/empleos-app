import { Component, Input } from '@angular/core';
import { Vacante } from '../../models/vacante.model';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-detalle-vacante',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './detalle-vacante.html',
  styleUrl: './detalle-vacante.css',
})
export class DetalleVacante {
  @Input() vacante?: Vacante;
}
