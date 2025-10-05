import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { Contador } from '../../models/contador.model';
import { Chart, registerables } from 'chart.js';
import { VacanteService } from '../../../vacantes/services/vacante.service';
import { VacantePostulacion } from '../../models/postulacion-por-vacante.model';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class DashboardComponent implements AfterViewChecked {
  contadores: Contador = { activas: 0, expiradas: 0 };
  private chart: Chart | null = null;
  mostrarVacantesPorEstado = false;
  private chartRendered = false;
  private vacanteService = inject(VacanteService);
  private cdr = inject(ChangeDetectorRef);
  graficoActual: 'estado' | 'top5' | null = null;
  vacantesPostulacion: VacantePostulacion[] = [];

  ngAfterViewChecked(): void {
    if (!this.chartRendered) {
      if (this.graficoActual === 'estado') {
        const canvas = document.getElementById('dashboardVacantesPorEstado');
        if (canvas) this.renderChartVacantesPorEstado();
      } else if (this.graficoActual === 'top5') {
        const canvas = document.getElementById('dashboardTop5Postulaciones');
        if (canvas) this.renderChartTop5();
      }
    }
  }

  private renderChartVacantesPorEstado(): void {
    const canvas = document.getElementById(
      'dashboardVacantesPorEstado'
    ) as HTMLCanvasElement | null;
    if (!canvas) return;

    if (this.chart) this.chart.destroy();
    this.chartRendered = true;

    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Activas', 'Expiradas'],
        datasets: [
          {
            label: 'Vacantes por estado',
            data: [this.contadores.activas, this.contadores.expiradas],
            borderWidth: 1,
            backgroundColor: ['#36a2eb', '#ff6384'],
          },
        ],
      },
      options: { scales: { y: { beginAtZero: true } } },
    });
  }

  private renderChartTop5(): void {
    const canvas = document.getElementById(
      'dashboardTop5Postulaciones'
    ) as HTMLCanvasElement | null;
    if (!canvas) return;

    if (this.chart) this.chart.destroy();
    this.chartRendered = true;

    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: this.vacantesPostulacion.map((v) => v.tituloVacante),
        datasets: [
          {
            label: 'Postulaciones totales por vacante',
            data: this.vacantesPostulacion.map((v) => v.totalPostulaciones),
            borderWidth: 1,
            backgroundColor: [
              '#36a2eb',
              '#4bc0c0',
              '#9966ff',
              '#ff9f40',
              '#ff6384',
            ],
          },
        ],
      },
      options: { scales: { y: { beginAtZero: true } } },
    });
  }

  onMostrarVacantesPorEstado() {
    this.vacanteService.getContadores().subscribe({
      next: (data) => {
        this.contadores = data;
        this.mostrarVacantesPorEstado = true;
        this.graficoActual = 'estado';
        this.chartRendered = false;
        this.cdr.detectChanges();
      },
      error: (error) => console.log(error),
    });
  }

  onMostrarTop5PostulacionesPorVacante() {
    this.vacanteService.getTop5VacantesPostuladas().subscribe({
      next: (data) => {
        this.vacantesPostulacion = data;
        this.mostrarVacantesPorEstado = false;
        this.graficoActual = 'top5';
        this.chartRendered = false;
        this.cdr.detectChanges();
      },
      error: (error) => console.log(error),
    });
  }
}
