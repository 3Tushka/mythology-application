import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'articles/:id', component: ArticleDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
