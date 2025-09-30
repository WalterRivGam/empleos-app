import { Component, inject } from '@angular/core';
import { Credenciales } from '../../model/credenciales.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  mostrarValidacion: boolean = false;
  credenciales = new Credenciales();
  authService = inject(AuthService);
  router = inject(Router);

  onSubmit() {
    this.mostrarValidacion = true;
    if (this.authService.verificarCredenciales(this.credenciales)) {
      this.router.navigate(['/componente-main-admin']);
    }
  }
}
