import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent }   from './components/overview/overview.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: OverviewComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
