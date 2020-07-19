import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegistraionComponent } from './registraion/registraion.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LogInComponent } from './log-in/log-in.component';
import { NewsFeedComponent } from './news-feed/news-feed.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const approute: Routes = [
  { path: '', redirectTo: '/news-feed', pathMatch: 'full' },
  { path: 'registration', component: RegistraionComponent },
  { path: 'login', component: LogInComponent },
  { path: 'news-feed', component: NewsFeedComponent },
  { path: '**', component: PageNotFoundComponent }

]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(approute),
  ],
  declarations: [
    RegistraionComponent,
    LogInComponent,
    NewsFeedComponent,
    PageNotFoundComponent
  ],
  exports: [RouterModule],

})
export class AppRoutingModule { }
