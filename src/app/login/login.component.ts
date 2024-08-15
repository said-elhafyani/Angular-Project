import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
 formLogin! : FormGroup;
 errorMessage =undefined;

 constructor(private formBuilder: FormBuilder, private router : Router,
            private authService:AuthService) {
 }
  ngOnInit(): void {
   this.formLogin = this.formBuilder.group({
     username : this.formBuilder.control(""),
     password  : this.formBuilder.control("")
   })
  }

  handleLogin() {
    let username = this.formLogin.value.username;
    let password = this.formLogin.value.password;
    this.authService.login(username,password).
    then(resp=>{
      this.router.navigateByUrl('/admin');
    })
      .catch(err=>{
          this.errorMessage = err;
      })

  }
}
