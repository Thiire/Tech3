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

export interface playlist {
  name: string;
  owner: string;
  description: string;
  image: string;
  total: number;
  id: string;
  follow: boolean;
}

@Component({
  selector: 'app-spotify',
  templateUrl: './spotify.component.html',
  styleUrls: ['./spotify.component.css']
})
export class SpotifyComponent implements OnInit, OnDestroy {
  state: boolean = false;
  connected: boolean = false;
  key: string = "";
  username: string = "";
  isVisible: boolean = false;
  isExpanded: boolean = true;
  title: string = 'Dashboard';
  public textError: string = "";
  timer: any;
  timing: number = 15000;
  test: string = "15s";
  playlists: playlist[] = [];
  searchplaylists: playlist[] = [];

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
      "Minecraft",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/Minecraft_Logo.svg")
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

  getPlaylistUpdate() {
    this.http.get(this.ROOT_URL + "/information/spotify/getlist?key=" + this.key).subscribe(result => {
      var tmp = Object.values(result);
      this.playlists = [];
      for (var i = 0; i < tmp[1].length; i++) {
        var obj: playlist = {
          name: tmp[1][i].name,
          id: tmp[1][i].id,
          owner: tmp[1][i].owner.display_name,
          image: tmp[1][i].images[0].url,
          description: tmp[1][i].description.substr(0, tmp[1][i].description.indexOf("<")),
          total: tmp[1][i].tracks.total,
          follow: true
        };
        this.playlists.push(obj);
      }
    })
  }

  listSearch(name: string) {
    if (!this.state) {
      return this.showAlert("Veuillez vous connectez sur la page d'accueil en premier", 240000);
    } else if (name.length == 0) {
      return this.showAlert("Veuillez rentrez un nom de playlist", 4500);
    }
    this.http.get(this.ROOT_URL + "/information/spotify/searchplaylist?key=" + this.key + "&list=" + name).subscribe(result => {
      var tmp = Object.values(result);
      this.searchplaylists = [];
      for (var i = 0; i < tmp[0].items.length; i++) {
        var obj: playlist = {
          name: tmp[0].items[i].name,
          id: tmp[0].items[i].id,
          owner: tmp[0].items[i].owner.display_name,
          image: tmp[0].items[i].images[0].url,
          description: tmp[0].items[i].description.substr(0, tmp[0].items[i].description.indexOf("<")),
          total: tmp[0].items[i].tracks.total,
          follow: false
        };
        this.searchplaylists.push(obj);
      }
    })
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.getPlaylistUpdate();
    }, this.timing);
  }

  ngOnInit() {
    this.key = (history.state.key) ? history.state.key : "";
    this.username = (history.state.username) ? history.state.username : "";
    if (this.key.length == 0 || this.username.length == 0) {
      this.state = false;
      this.showAlert("Veuillez vous connectez sur la page d'accueil en premier", 240000);
    } else {
      this.state = true;
      this.http.get(this.ROOT_URL + "/connected/spotify?key=" + this.key).subscribe(result => {
        if (result == 200) {
          this.connected = true;
          this.getPlaylistUpdate();
          this.startTimer();
        }
      })
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  follow(id: string, nb: number) {
    if (nb == 0) {
      for (var i = 0; i < this.playlists.length; i++) {
        if (this.playlists[i].id == id) {
          this.playlists[i].follow != this.playlists[i].follow
        }
      }
    } else {
      for (var i = 0; i < this.searchplaylists.length; i++) {
        if (this.searchplaylists[i].id == id) {
          this.searchplaylists[i].follow != this.searchplaylists[i].follow
        }
      }
    }
    this.http.get(this.ROOT_URL + "/information/spotify/follow?key=" + this.key + '&id=' + id).subscribe(result => {
      if (result == 200) {
        this.getPlaylistUpdate();
      }
    })
  }

  unfollow(id: string, nb: number) {
    if (nb == 0) {
      for (var i = 0; i < this.playlists.length; i++) {
        if (this.playlists[i].id == id) {
          this.playlists[i].follow != this.playlists[i].follow
        }
      }
    } else {
      for (var i = 0; i < this.searchplaylists.length; i++) {
        if (this.searchplaylists[i].id == id) {
          this.searchplaylists[i].follow != this.searchplaylists[i].follow
        }
      }
    }
    this.http.get(this.ROOT_URL + "/information/spotify/unfollow?key=" + this.key + '&id=' + id).subscribe(result => {
      if (result == 200) {
        this.getPlaylistUpdate();
      }
    })
  }

  showText(name: string, prefix: string): boolean {
    return name.toLowerCase().startsWith(prefix.toLowerCase());
  }

  showAlert(text: string, duration: number) : void {
    if (this.isVisible) { 
      return;
    }
    this.textError = text;
    this.isVisible = true;
    setTimeout(()=> this.isVisible = false,duration)
  }

  goToPage(PageName:string):void{
    this.router.navigateByUrl(PageName, { state: {key: this.key, username: this.username}});
  }

  createPlaylist(playlist: string) {
    if (playlist.length == 0) {
      return this.showAlert("veuillez rentrez un nom de playlist valide", 4500);
    }
    this.http.get(this.ROOT_URL + "/information/spotify/addlist?key=" + this.key + "&name=" + playlist).subscribe(result => {
      console.log(result);
    })
  }

  goToLink(url: string) {
    const tmp = window.open(url, "_blank");
    var inter = window.setInterval(() => {
      if (tmp?.location?.href && tmp?.location?.href.match('localhost:5000') && tmp?.location?.href.match('code')) {
        var url = new URL(tmp.location.href);
        this.post = this.http.post(this.ROOT_URL + '/oauth2callback/spotify', {"code": url.searchParams.get("code"), "key": this.key}).catch(err => {
          return Observable.of(err);
        });
        this.post.subscribe(result => {
          this.connected = true;
          this.getPlaylistUpdate();
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
