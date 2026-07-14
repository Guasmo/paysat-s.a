import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';
import { Help } from './pages/help/help';

import { AbreTuCuenta } from './pages/abre-tu-cuenta/abre-tu-cuenta';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { Nosotros } from './pages/nosotros/nosotros';
import { Pagocel } from './pages/pagocel/pagocel';
import { ProcesoImplementacion } from './pages/proceso-implementacion/proceso-implementacion';
import { Seguridad } from './pages/seguridad/seguridad';
import { Recursos } from './pages/recursos/recursos';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'services', component: Services },
  { path: 'soluciones', component: Services },
  { path: 'nosotros', component: Nosotros },
  { path: 'pagocel', component: Pagocel },
  { path: 'proceso-implementacion', component: ProcesoImplementacion },
  { path: 'seguridad', component: Seguridad },
  { path: 'recursos', component: Recursos },
  { path: 'help', component: Help },
  { path: 'abre-tu-cuenta', component: AbreTuCuenta },
  { path: 'politica-de-privacidad', component: PrivacyPolicy },
  { path: '**', redirectTo: '' }
];
