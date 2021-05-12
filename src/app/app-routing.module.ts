import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsermenuComponent } from './components/user/usermenu/usermenu.component';
import { LoginComponent } from './components/authorization/login/login.component';
import { RegisterComponent } from './components/authorization/register/register.component';
import { CampaignredactComponent } from './components/campaign/campaignredact/campaignredact.component';
import { RoleGuardService } from './services/role-guard-service/role-guard.service';
import { MainPageComponent } from './components/main/main-page/main-page.component';
import { UserContentGuardService } from './services/content-guard-service/user-content-guard.service';
import { Roles } from './domain/roles';
import { CampaignViewComponent } from './components/campaign-view/campaign-view/campaign-view.component';
import { AdminComponent } from './components/admin/admin.component';


const routes: Routes = [
  /*{ path: '1111', component: CampaignViewComponent },*/
  { path: 'home', component: MainPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  //{ path: 'admin', component: AdminComponent, canActivate: [RoleGuardService], }
  { path: 'user/:username/campaign/new', component: CampaignredactComponent, canActivate: [RoleGuardService], data: {expectedRoles: [Roles.ROLE_USER, Roles.ROLE_ADMIN]}},
  { path: 'user/:username/campaign/:campaign/edit', component: CampaignredactComponent, canActivate: [RoleGuardService], data: {expectedRoles: [Roles.ROLE_USER, Roles.ROLE_ADMIN]}},
  { path: 'user/:username', component: UsermenuComponent, canActivate: [RoleGuardService, UserContentGuardService], data: {expectedRoles: [Roles.ROLE_USER, Roles.ROLE_ADMIN]}},
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
