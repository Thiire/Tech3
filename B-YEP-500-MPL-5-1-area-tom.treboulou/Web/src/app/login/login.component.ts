import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../common/local-storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router, private http: HttpClient, private localStorageService: LocalStorageService) { }
  email = new FormControl('', [Validators.required, Validators.email]);
  pass = new FormControl('', [Validators.required]);
  pass2 = new FormControl('', [Validators.required]);
  hide = true;
  mode = true;
  networks = [{"name": "twitter", "actions": [{"args": "", "name": "liker un tweet"}, {"args": "", "name": "recevoir un message"}], "reactions": [{"args": [{"methode": "getTwitterFriendsList", "placeholder": "destinataire", "type": "list"}, {"methode": "", "placeholder": "message", "type": "string"}], "name": "poster un tweet"}]}, {"name": "facebook", "actions": [{"args": "", "name": "liker un post"}, {"args": "", "name": "recevoir un message"}], "reactions": [{"args": [{"methode": "getFacebookFriendsList", "placeholder": "destinataire", "type": "list"}, {"methode": "", "placeholder": "message", "type": "string"}], "name": "créer un post"}]}, {"name": "spotify", "actions": [{"args": "", "name": "liker une playlist"}], "reactions": [{"args": [{"methode": "", "placeholder": "nom de playlist", "type": "string"}], "name": "creer une playlist"}]}, {"name": "youtube", "actions": [{"args": "", "name": "s'abonner a une chaine"}, {"args": [{"methode": "getYoutubeVideo", "placeholder": "vidéo", "type": "list"}], "name": "recevoir un commentaire"}], "reactions": ""}, {"name": "twitch", "actions": [{"args": "", "name": "suivre un compte"}], "reactions": [{"args": [{"methode": "", "placeholder": "nom de compte", "type": "string"}, {"methode": "", "placeholder": "message", "type": "string"}], "name": "envoyer un message"}]}];
  ngOnInit(): void {
    console.log(this.networks);
  }

  register()
  {
    if (this.mode) {
      this.mode = false;
      return;
    }
    if (this.pass2.valid && this.pass.valid && this.email.valid && this.pass.value == this.pass2.value) {
      console.log("rff", this.email, this.pass);
        this._authService.register(this.email.value, this.pass.value);
        this.localStorageService.stock('email', this.email.value);
    } else {
      this.email.markAsTouched();
      this.pass.markAsTouched();
      this.pass2.markAsTouched();
    }
    console.log(this.email);
  }

  connect() {
    if (!this.mode) {
      this.mode = true;
    }
    if (this.pass.valid && this.email.valid) {
      this._authService.connection(this.email.value, this.pass.value);
      this.localStorageService.stock('email', this.email.value);
    } else {
      this.email.markAsTouched();
      this.pass.markAsTouched();
      this.pass2.markAsTouched();
    }
  }

  loginWith(app) {
    if (app == "facebook") {
      console.log("fb");
      this._authService.fbAuth();
    }
    if (app == "google") {
      console.log ("google")
      this._authService.GoogleAuth();
    }
  }
}
