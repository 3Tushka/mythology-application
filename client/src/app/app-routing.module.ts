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
import { QuizComponent } from './quiz/quiz.component';

const routes: Routes = [
  { path: '', component: HomepageComponent, data: { breadcrumb: 'Home' } },
  {
    path: 'articles',
    component: ArticlesComponent,
    data: { breadcrumb: 'Articles' },
  },
  {
    path: 'calendar',
    component: CalendarComponent,
    data: { breadcrumb: 'Calendar' },
  },
  {
    path: 'articles/:id',
    component: ArticleDetailsComponent,
    data: { breadcrumb: 'Article' },
  },
  {
    path: 'calendar/:id',
    component: CalendarDetailsComponent,
    data: { breadcrumb: 'Calendar' },
  },
  {
    path: 'auth/login',
    component: AuthFormLoginComponent,
    data: { breadcrumb: 'Login' },
  },
  {
    path: 'auth/registration',
    component: AuthFormRegisterComponent,
    data: { breadcrumb: 'Registraion' },
  },
  {
    path: 'articles/:id/comments',
    component: CommentsComponent,
    data: { breadcrumb: 'Comments' },
  },
  {
    path: 'articles/:id/comments/:commentId',
    component: ConfirmDeleteComponent,
    data: { breadcrumb: 'Comment' },
  },
  {
    path: 'articles/:id/comments/:commentId/update',
    component: UpdateCommentComponent,
    data: { breadcrumb: 'Comment Update' },
  },
  {
    path: 'admin-table',
    component: AdmintableComponent,
    data: { breadcrumb: 'Admin' },
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    data: { breadcrumb: 'Profile' },
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: { breadcrumb: 'Error' },
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
    data: { breadcrumb: 'Feedback' },
  },
  {
    path: 'feedback-admin',
    component: FeedbackAdminComponent,
    data: { breadcrumb: 'Feedback Admin' },

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
  { path: 'quiz', component: QuizComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
