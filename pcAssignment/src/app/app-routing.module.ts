import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { EventDetailsComponent } from './event/event-details/event-details.component';
import { EventFormComponent } from './event/event-form/event-form.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'events', component: EventListComponent, canActivate: [AuthGuard] },
  {
    path: 'event/:id',
    component: EventDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'edit/:id', component: EventFormComponent, canActivate: [AuthGuard] },
  { path: 'create', component: EventFormComponent, canActivate: [AuthGuard] },

  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: '**', redirectTo: '/register' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
