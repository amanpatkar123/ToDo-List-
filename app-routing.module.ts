import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignOutComponent } from './sign-out/sign-out.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  { path:'' , pathMatch: 'full' ,redirectTo: "login"},
  { path:'home' ,   component:HomeComponent, pathMatch: 'full'},
  { path:'log-in' , component:LoginComponent, pathMatch: 'full'},
  { path:'sign-up' ,component:SignUpComponent, pathMatch: 'full'},
  { path:'sign-out' ,component:SignOutComponent, pathMatch: 'full'},
  { path:'todo-list' ,component:TodoListComponent, pathMatch: 'full'},
  { path: "**", redirectTo: "LoginComponent" },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
