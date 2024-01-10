import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-form-register',
  templateUrl: './auth-form-register.component.html',
  styleUrls: ['./auth-form-register.component.scss'],
})
export class AuthFormRegisterComponent implements OnInit {
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
      .post(
        'http://localhost:1268/auth/registration',
        this.form.getRawValue(),
        {
          withCredentials: true,
        },
      )
      .subscribe(() => this.router.navigate(['/']));
  }
}
