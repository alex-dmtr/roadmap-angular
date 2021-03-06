import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { HomeComponent } from './home.component';
import { GroupsComponent } from './groups.component';
import { GroupComponent } from './group.component';
import { NavComponent } from './nav.component';
import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profile.edit.component';
import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'groups', component: GroupsComponent, canActivate: [AuthGuard] },
  { path: 'groups/:id', component: GroupComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'profile/edit', component: ProfileEditComponent, canActivate: [AuthGuard] }
  // { path: 'detail/:id', component: HeroDetailComponent },
  // { path: 'heroes',     component: HeroesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutedComponents = [LoginComponent, RegisterComponent, HomeComponent, GroupsComponent, GroupComponent, ProfileComponent, ProfileEditComponent];
