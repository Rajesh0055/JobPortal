import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: any;
    loading = false;
    submitted = false;
    error = '';

    constructor(
      private formBuilder: FormBuilder,
      private router: Router) { 
        // this.loginForm = new FormGroup({
        //   // username: new FormControl('',Validators.required),
        //   // userpassword: new FormControl('',Validators.required)
        //   'userName':['',Validators.required],

        // });

        this.loginForm = this.formBuilder.group({
          username: ['', [Validators.required,Validators.email]],
          userpassword: ['', [Validators.required]]
        });
        
    
  }
  login()
  {
    debugger;
    console.log(this.loginForm.controls);
    sessionStorage.setItem('username',this.loginForm.get("username").value)
    this.router.navigate(['deshboard-page']);

  }
}
