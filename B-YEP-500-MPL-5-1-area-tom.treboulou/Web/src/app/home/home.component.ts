import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../common/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }
  app1 = null;
  app2 = null;
  lastStep1 = null;
  lastStep2 = null;
  selected = null;
  selected2 = null;
  isConnected = false;
  firstConnect = false;
  secondConnect = false;
  // networks = [{"name": "twitter", "actions": [{"args": [], "name": "liker un tweet"}, {"args": [], "name": "recevoir un message"}], "reactions": [{"args": [{"methode": "getTwitterFriendsList", "placeholder": "destinataire", "type": "list"}, {"methode": "", "placeholder": "message", "type": "string"}], "name": "poster un tweet"}]}, {"name": "facebook", "actions": [{"args": [], "name": "liker un post"}, {"args": [], "name": "recevoir un message"}], "reactions": [{"args": [{"methode": "getFacebookFriendsList", "placeholder": "destinataire", "type": "list"}, {"methode": "", "placeholder": "message", "type": "string"}], "name": "créer un post"}]}, {"name": "spotify", "actions": [{"args": [], "name": "liker une playlist"}], "reactions": [{"args": [{"methode": "", "placeholder": "nom de playlist", "type": "string"}], "name": "creer une playlist"}]}, {"name": "youtube", "actions": [{"args": [], "name": "s'abonner a une chaine"}, {"args": [{"methode": "getYoutubeVideo", "placeholder": "vidéo", "type": "list"}], "name": "recevoir un commentaire"}], "reactions": []}, {"name": "twitch", "actions": [{"args": [], "name": "suivre un compte"}], "reactions": [{"args": [{"methode": "", "placeholder": "nom de compte", "type": "string"}, {"methode": "", "placeholder": "message", "type": "string"}], "name": "envoyer un message"}]}];
  areas: any;

  ngOnInit(): void {
    this.getAreas();
  }
  
  getAreas() {
    this.http.get('https://area-babyb.herokuapp.com/userAreas', {
      headers: {
        'email': this.localStorageService.get('email')
      }
    }).subscribe((res) => {
      console.log(res);
      this.areas = res;
    })
  }

}
