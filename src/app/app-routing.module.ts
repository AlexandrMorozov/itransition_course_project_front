import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsermenuComponent } from './components/usermenu/usermenu.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CampaignredactComponent } from './components/campaignredact/campaignredact.component';
import { RoleGuardService } from './services/role-guard-service/role-guard.service';

const routes: Routes = [
  { path: 'user', component: UsermenuComponent, canActivate: [RoleGuardService], data: {expectedRoles: ['ROLE_USER', 'ROLE_ADMIN']}},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'campaignnew', component: CampaignredactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
