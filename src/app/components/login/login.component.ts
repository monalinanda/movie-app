import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage = '';
  submited = false;
  loginCredentials = {
    username: 'Monali',
    password: '1234',
  };

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    console.log(this.loginForm, this.loginForm.value);
    this.submited = true;
    if (!this.loginForm.valid) {
      return;
    }
    if (
      this.loginForm.value.username !== this.loginCredentials.username ||
      this.loginForm.value.password !== this.loginCredentials.password
    ) {
      this.errorMessage = 'Invalid username or password , try again';
      return;
    }
    localStorage.setItem('token', '123');
    this.router.navigate(['home']);
  }
}
