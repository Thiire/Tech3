import { Component, OnInit, OnDestroy, Inject, Injectable } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'

export interface user {
  name: string;
  title: string;
  image: string;
  id: string;
  live: boolean;
  language: string;
}

@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.css']
})
export class TwitchComponent implements OnInit, OnDestroy {
  state: boolean = false;
  connected: boolean = false;
  key: string = "";
  username: string = "";
  isVisible: boolean = false;
  isExpanded: boolean = true;
  title: string = 'Dashboard';
  public textError: string = "";
  checked: boolean = false;
  timer: any;
  timing: number = 60000;
  test: string = "60s";
  users: user[] = [];
  channels: user[] = []

  readonly ROOT_URL = 'http://localhost:8080';
  post: Observable<any>;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private router:Router, private route: ActivatedRoute, public dialog: MatDialog, private http: HttpClient){
    this.matIconRegistry.addSvgIcon(
      "Twitch",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Twitch_Logo.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "Spotify",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Spotify_Logo.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "Battlenet",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Battlenet_Logo.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "Money",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Money_Logo.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "Meteo",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Meteo_Logo.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "Youtube",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Youtube_Logo.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "Home",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Home_Logo.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "Heure",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Heure_Logo.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "Lorem",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Lorem_Logo.svg")
    );
  }

  ngOnInit() {
    this.key = (history.state.key) ? history.state.key : "";
    this.username = (history.state.username) ? history.state.username : "";
    if (this.key.length == 0 || this.username.length == 0) {
      this.state = false;
      this.showAlert("Veuillez vous connectez sur la page d'accueil en premier", 240000);
    } else {
      this.state = true;
      this.http.get(this.ROOT_URL + "/connected/twitch?key=" + this.key).subscribe(result => {
        if (result == 200) {
          this.getUserlistUpdate();
          this.startTimer();
          this.connected = true;
        }
      })
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  toggle(state: boolean) {
    this.checked = state;
  }

  getUserChannel(name: string, loading: user[]) {
    this.http.get(this.ROOT_URL + "/information/twitch/channel?key=" + this.key + "&id=" + name).subscribe(result => {
      var tmp = Object.values(result);
      var obj: user = {
        name: tmp[0][0].display_name,
        title: tmp[0][0].description,
        image: tmp[0][0].profile_image_url,
        id: tmp[0][0].id,
        live: false,
        language: tmp[0][0].broadcaster_type
      };
      loading.push(obj);
    })
  }

  listSearch(name: string) {
    if (!this.state) {
      return this.showAlert("Veuillez vous connectez sur la page d'accueil en premier", 240000);
    } else if (name.length == 0) {
      return this.showAlert("Veuillez rentrez un nom d'utilisateur", 4500);
    }
    this.http.get(this.ROOT_URL + "/information/twitch/searchchannel?key=" + this.key + "&channel=" + name + '&live=' + this.checked).subscribe(result => {
      var tmp = Object.values(result);
      this.users = [];
      for (var i = 0; i < tmp[0].length; i++) {
        var obj: user = {
          name: tmp[0][i].display_name,
          title: tmp[0][i].title,
          image: tmp[0][i].thumbnail_url,
          id: tmp[0][i].id,
          live: tmp[0][i].is_live,
          language: tmp[0][i].broadcaster_language
        };
        this.users.push(obj);
      }
    })
  }

  async getUserlistUpdate() {
    this.http.get(this.ROOT_URL + "/information/twitch/getlist?key=" + this.key).subscribe(result => {
      var tmp = Object.values(result);
      var userstmp: user[] = [] 
      for (var i = 0; i < tmp[0].length; i++) {
        this.getUserChannel(tmp[0][i].to_id, userstmp);
      }
      this.channels = userstmp;
    })
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.getUserlistUpdate();
    }, this.timing);
  }

  unfollow(id: string) {
    this.http.get(this.ROOT_URL + "/information/twitch/unfollow?key=" + this.key + '&id=' + id).subscribe(result => {
      if (result == 200) {
        this.getUserlistUpdate();
      }
    })
  }

  follow(id: string) {
    this.http.get(this.ROOT_URL + "/information/twitch/follow?key=" + this.key + '&id=' + id).subscribe(result => {
      if (result == 200) {
        this.getUserlistUpdate();
      }
    })
  }

  showAlert(text: string, duration: number) : void {
    if (this.isVisible) { 
      return;
    }
    this.textError = text;
    this.isVisible = true;
    setTimeout(()=> this.isVisible = false,duration)
  }

  showText(name: string, prefix: string): boolean {
    return name.toLowerCase().startsWith(prefix.toLowerCase());
  }

  goToPage(PageName:string):void{
    this.router.navigateByUrl(PageName, { state: {key: this.key, username: this.username}});
  }

  goToLink(url: string) {
    const tmp = window.open(url, "_blank");
    var inter = window.setInterval(() => {
      if (tmp?.location?.href && tmp?.location?.href.match('localhost:5000') && tmp?.location?.href.match('code')) {
        var url = new URL(tmp.location.href);
        this.post = this.http.post(this.ROOT_URL + '/oauth2callback/twitch', {"code": url.searchParams.get("code"), "key": this.key}).catch(err => {
          return Observable.of(err);
        });
        this.post.subscribe(result => {
          this.connected = true;
          this.getUserlistUpdate();
          this.startTimer();
          tmp?.close();
          window.clearInterval(inter);
        })
      } else if (tmp?.closed) {
        this.connected = false;
        this.showAlert("La connexion n'a pas aboutie", 4500);
        tmp?.close();
        window.clearInterval(inter);
      }
    }, 5000)
  }
}
