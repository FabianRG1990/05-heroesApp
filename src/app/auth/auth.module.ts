import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LayoutPegeComponent } from './pages/layout-pege/layout-pege.component';
import { LoginPegeComponent } from './pages/login-pege/login-pege.component';
import { RegisterPegeComponent } from './pages/register-pege/register-pege.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    LayoutPegeComponent,
    LoginPegeComponent,
    RegisterPegeComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule
  ]
})
export class AuthModule { }
