import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { StoreModule } from '@ngrx/store';
// import { AuthReducer } from './state/auth.reducer';
// import { AUTH_STATE_NAME } from './state/auth.selector';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';

const routes: Routes = [
  {
    path: '',
    children: [
      // { path: '', redirectTo: 'login' }, // original code from the video, not working
      { path: '**', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
    ],
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    EffectsModule.forFeature([AuthEffects]),
    // StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer),  // para solucionar el problema de que no puede leer la propieda user del objeto state (public/src/app/auth/state/auth.selector.ts)
    RouterModule.forChild(routes)
  ]
})
export class AuthModule {}