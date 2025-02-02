import { Routes } from '@angular/router';
import { TestComponent } from './pages/test/test.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];
