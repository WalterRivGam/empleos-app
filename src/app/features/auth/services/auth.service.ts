import { Injectable } from '@angular/core';
import { Credenciales } from '../model/credenciales.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  verificarCredenciales(credenciales: Credenciales): boolean {
    return (
      credenciales.username === 'admin' && credenciales.password === 'admin'
    );
  }
}
