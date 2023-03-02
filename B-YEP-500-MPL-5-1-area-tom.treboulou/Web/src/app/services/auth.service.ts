import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;
  constructor(private _router: Router, private http: HttpClient) { }


  GoogleAuth() {
    return firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((res) => {
      console.log(res);
      this.isAuthenticated = true;
      this._router.navigate(['home']);
    }).catch((err) => {
      console.log(err);
    })
  }
  connection(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password).then((res) => {
      console.log(res);
      this.isAuthenticated = true;
      this._router.navigate(['home']);
    }).catch((err) => {
      console.log(err);
    })
  }

  register(email, password) {
    this.http.post('https://area-babyb.herokuapp.com/signUp', {
      "username": email,
      "password": password,
      "mail": email
    }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS"
      }
    }).subscribe((res) => {
      console.log(res);
      this.isAuthenticated = true;
      this._router.navigate(['home']);
    });
  }

  isAuth() : boolean {
    return this.isAuthenticated;
  }

  fbAuth() {
    return firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(() => {
      console.log("Connexion reussi");
      this.isAuthenticated = true;
      this._router.navigate(['home']);
    }).catch((err) => {
      console.log(err);
    })
  }
}
