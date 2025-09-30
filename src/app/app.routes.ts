import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login';
import { MainCandidatoComponent } from './features/main/components/main-candidato/main-candidato';
import { MainAdminComponent } from './features/main/components/main-admin/main-admin';

export const routes: Routes = [
  { path: 'componente-login', component: LoginComponent },
  { path: 'componente-main-candidato', component: MainCandidatoComponent },
  { path: 'componente-main-admin', component: MainAdminComponent },
];
