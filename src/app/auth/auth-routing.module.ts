import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPegeComponent } from './pages/layout-pege/layout-pege.component';
import { LoginPegeComponent } from './pages/login-pege/login-pege.component';
import { RegisterPegeComponent } from './pages/register-pege/register-pege.component';

const routes: Routes = [
  {
  path: '',
  component: LayoutPegeComponent,
  children: [
    {path: 'login', component: LoginPegeComponent},
    {path: 'new-account', component: RegisterPegeComponent},
    {path:'**', redirectTo: 'login'}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {

}
