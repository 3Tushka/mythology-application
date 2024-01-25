import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicesService } from '../services.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent {
  articles$!: Observable<any>;
  form!: FormGroup;

  jwtHelper = new JwtHelperService();

  isAddButtonClicked = false;

  constructor(
    private articlesService: ServicesService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.articles$ = this.articlesService.getArticles();

    this.form = this.fb.group({
      title: '',
      content: '',
      category: '',
      image: '',
    });
  }

  submit(): void {
    this.http
      .post('http://localhost:1268/articles', this.form.getRawValue(), {
        withCredentials: true,
      })
      .subscribe(() => {
        this.router.navigate(['/articles']);
      });
  }

  // set this shit in service or whatever
  isAdmin(): boolean {
    const token = this.cookieService.get('token');
    if (!token) return false;

    const decodedToken = this.jwtHelper.decodeToken(token);
    return decodedToken.role === 'admin';
  }

  onAddButtonClick(): void {
    this.isAddButtonClicked = true;
  }

  onCloseButtonClick(): void {
    this.isAddButtonClicked = false;
  }
}
