import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarDetailsComponent } from './calendar-details/calendar-details.component';
import { AuthFormLoginComponent } from './auth-form-login/auth-form-login.component';
import { AuthFormRegisterComponent } from './auth-form-register/auth-form-register.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'articles/:id', component: ArticleDetailsComponent },
  { path: 'calendar/:id', component: CalendarDetailsComponent },
  { path: 'auth/login', component: AuthFormLoginComponent },
  { path: 'auth/registration', component: AuthFormRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
