import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { OverviewComponent }   from './components/overview/overview.component';
import { ErrorComponent } from './components/error/error.component';
import { AuthGuard } from './guards/auth.guard';
import { StreamComponent } from './components/stream/stream.component';

const routes: Routes = [
  { path: '', component: OverviewComponent, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard] },
  { path: 'stream', component: StreamComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
