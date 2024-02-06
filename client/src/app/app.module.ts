import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { HomepageComponent } from './homepage/homepage.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

import { NgOptimizedImage } from '@angular/common';
import { CalendarDetailsComponent } from './calendar-details/calendar-details.component';
import { FooterComponent } from './footer/footer.component';
import { AuthFormLoginComponent } from './auth-form-login/auth-form-login.component';
import { AuthFormRegisterComponent } from './auth-form-register/auth-form-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatDialogModule } from '@angular/material/dialog';
import { CommentsComponent } from './comments/comments.component';
import { ConfirmDeleteComponent } from './comments/confirm-delete/confirm-delete.component';
import { UpdateCommentComponent } from './comments/update-comment/update-comment.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AdmintableComponent } from './admintable/admintable.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    NavbarComponent,
    HomepageComponent,
    CalendarComponent,
    ArticleDetailsComponent,
    CalendarDetailsComponent,
    FooterComponent,
    AuthFormLoginComponent,
    AuthFormRegisterComponent,
    CommentsComponent,
    ConfirmDeleteComponent,
    UpdateCommentComponent,
    AdmintableComponent,
    ProfileComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgOptimizedImage,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
