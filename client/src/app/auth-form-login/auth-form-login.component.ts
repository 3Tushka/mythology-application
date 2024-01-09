import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form-login',
  templateUrl: './auth-form-login.component.html',
  styleUrls: ['./auth-form-login.component.scss'],
})
export class AuthFormLoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  submit(): void {
    this.http
      .post('http://localhost:1268/auth/login', this.form.getRawValue(), {
        withCredentials: true,
      })
      .subscribe(() => this.router.navigate(['/']));
  }
}
