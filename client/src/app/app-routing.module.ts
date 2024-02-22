import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarDetailsComponent } from './calendar-details/calendar-details.component';
import { AuthFormLoginComponent } from './auth-form-login/auth-form-login.component';
import { AuthFormRegisterComponent } from './auth-form-register/auth-form-register.component';
import { CommentsComponent } from './comments/comments.component';
import { ConfirmDeleteComponent } from './comments/confirm-delete/confirm-delete.component';
import { UpdateCommentComponent } from './comments/update-comment/update-comment.component';
import { AdmintableComponent } from './admintable/admintable.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { FeedbackAdminComponent } from './admintable/feedback-admin/feedback-admin.component';
import { FeedbackConfirmDeleteComponent } from './admintable/feedback-admin/feedback-confirm-delete/feedback-confirm-delete.component';
import { FeedbackConfirmMarkComponent } from './admintable/feedback-admin/feedback-confirm-mark/feedback-confirm-mark.component';
import { UsersAdminComponent } from './admintable/users-admin/users-admin.component';
import { ArticlesAdminComponent } from './admintable/articles-admin/articles-admin.component';
import { CalendarAdminComponent } from './admintable/calendar-admin/calendar-admin.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'articles/:id', component: ArticleDetailsComponent },
  { path: 'calendar/:id', component: CalendarDetailsComponent },
  { path: 'auth/login', component: AuthFormLoginComponent },
  { path: 'auth/registration', component: AuthFormRegisterComponent },
  { path: 'articles/:id/comments', component: CommentsComponent },
  {
    path: 'articles/:id/comments/:commentId',
    component: ConfirmDeleteComponent,
  },
  {
    path: 'articles/:id/comments/:commentId/update',
    component: UpdateCommentComponent,
  },
  {
    path: 'admin-table',
    component: AdmintableComponent,
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
  },
  {
    path: 'error',
    component: ErrorPageComponent,
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
  },
  {
    path: 'feedback-admin',
    component: FeedbackAdminComponent,

    children: [
      {
        path: ':id/delete',
        component: FeedbackConfirmDeleteComponent,
      },
      {
        path: ':id/mark-as-fixed',
        component: FeedbackConfirmMarkComponent,
      },
    ],
  },
  {
    path: 'users-admin',
    component: UsersAdminComponent,
  },
  { path: 'articles-admin', component: ArticlesAdminComponent },
  {
    path: 'calendar-admin',
    component: CalendarAdminComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
