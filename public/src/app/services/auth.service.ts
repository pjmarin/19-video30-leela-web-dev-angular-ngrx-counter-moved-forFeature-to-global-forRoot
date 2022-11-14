import { User } from './../models/user.model';
import { Observable } from 'rxjs';
import { AuthResponseData } from './../models/AuthResponseData.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      "http://localhost:5000/api/v1/auth/login",
      { email, password }
      // { email, password, returnSecureToken: true }
    );
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000)
    const user = new User(data.email, data.idToken, data.localId, expirationDate);
    return user;
  }

  getErrorMessage(message: string) {
    switch(message) {
      case "Usuario o contrasena incorrecto/a !!!": {
        return "Email o password incorrecto";
      }

      default: {
        return "Ha habido algun error: " + message;
      }
    }
  }
}