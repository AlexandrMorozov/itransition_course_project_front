import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsermenuComponent } from './components/user/usermenu/usermenu.component';
import { LoginComponent } from './components/authorization/login/login.component';
import { RegisterComponent } from './components/authorization/register/register.component';
import { CampaignredactComponent } from './components/campaign/campaignredact/campaignredact.component';
import { RoleGuardService } from './services/role-guard-service/role-guard.service';
import { MainPageComponent } from './components/main/main-page/main-page.component';
import {UserContentGuardService } from './services/content-guard-service/user-content-guard.service';


const routes: Routes = [
  { path: 'home', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/:username/campaign/new', component: CampaignredactComponent, canActivate: [RoleGuardService], data: {expectedRoles: ['ROLE_USER', 'ROLE_ADMIN']}},
  { path: 'user/:username/campaign/:campaign/edit', component: CampaignredactComponent, canActivate: [RoleGuardService], data: {expectedRoles: ['ROLE_USER', 'ROLE_ADMIN']}},
  { path: 'user/:username', component: UsermenuComponent, canActivate: [RoleGuardService, UserContentGuardService], data: {expectedRoles: ['ROLE_USER', 'ROLE_ADMIN']}},
  /*{ path: 'campaignnew', component: CampaignredactComponent },*/
  { path: '**', redirectTo: 'home'}
  /*{ path: '/', component: MainPageComponent }*/

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
