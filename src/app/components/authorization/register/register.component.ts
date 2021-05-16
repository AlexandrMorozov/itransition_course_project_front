import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/authorization/authservice/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  form: any = {};

  isSuccessful = false;

  isSignUpFailed = false;
  
  errorMessage = '';

  constructor(private authService: AuthService,
     private messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        if (data == true) {
          
          this.isSuccessful = true;
          this.isSignUpFailed = false;

        } else {

          this.messageService.add({severity:'error', summary: 'Message', 
          detail: "User with such name already exists!"});

          this.isSignUpFailed = true;
        }
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
