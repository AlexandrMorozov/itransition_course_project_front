import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsermenuComponent } from './components/user/usermenu/usermenu.component';
import { CampaigntableComponent } from './components/user/campaigntable/campaigntable.component';
import { LoginComponent } from './components/authorization/login/login.component';
import { RegisterComponent } from './components/authorization/register/register.component';
import { CampaignredactComponent } from './components/campaign/campaignredact/campaignredact.component';
import { ImgInputComponent} from './components/campaign/img-input/img-input.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './helpers/auth.interceptor';

//primeng
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { ProgressBarModule } from 'primeng/progressbar';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { GalleriaModule } from 'primeng/galleria';
import { ToastModule } from 'primeng/toast';
//ng-bootstrap(for tabs)
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//ngeat(edit in place)
import { EditableModule } from '@ngneat/edit-in-place';
import { ReactiveFormsModule } from '@angular/forms';
//ngx-dropzone(for drag&drop pictures)
import { NgxDropzoneModule } from 'ngx-dropzone';
//ngx-chips(for tags input)
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!

//jwt
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";
import { BonusEditComponent } from './components/campaign/bonus-edit/bonus-edit.component';
import { MainPageComponent } from './components/main/main-page/main-page.component';
import { TagEditComponent } from './components/campaign/tag-edit/tag-edit.component';
import { AdminComponent } from './components/admin/admin.component';
import { CampaignViewComponent } from './components/campaign-view/campaign-view/campaign-view.component';
import { GalleriaViewComponent } from './components/campaign-view/galleria-view/galleria-view.component';
//import { BonusesViewComponent } from './components/campaign-view/galleria-view/galleria-view.component';

export function tokenGetter() {
  return sessionStorage.getItem("auth-token");
}



@NgModule({
  declarations: [
    AppComponent,
    UsermenuComponent,
    CampaigntableComponent,
    LoginComponent,
    RegisterComponent,
    CampaignredactComponent,
    ImgInputComponent,
    BonusEditComponent,
    MainPageComponent,
    TagEditComponent,
    AdminComponent,
    CampaignViewComponent,
    GalleriaViewComponent,
   // BonusesViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    //primeng
    TableModule,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    ButtonModule,
    InputTextareaModule,
    ToolbarModule,
    InputTextModule,
    CardModule,
    RatingModule,
    ProgressBarModule,
    ButtonModule,
    GalleriaModule,
    CarouselModule,
    TagModule,
    ToastModule,
    //ng-bootstrap(for tabs)
    NgbModule,
    //ngeat(edit in place)
    EditableModule,
    ReactiveFormsModule,
    //ngx-dropzone(for drag&drop pictures)
    NgxDropzoneModule,
    //ngx-chips(for tabs input)
    TagInputModule,
    BrowserAnimationsModule,
    //jwt
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:4200/", "http://localhost:8080/"]
      },
    })
  ],
  providers: [ 
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
       multi: true
      }],
  bootstrap: [AppComponent]
})
export class AppModule { }
