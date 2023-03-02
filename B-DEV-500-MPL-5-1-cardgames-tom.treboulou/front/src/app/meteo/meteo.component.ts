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

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit, OnDestroy {
  state: boolean = false;
  connected: boolean = false;
  key: string = "";
  username: string = "";
  isVisible: boolean = false;
  title: string = 'Dashboard';
  public textError: string = "";
  timer: any;
  timing: number = 15000;
  test: string = "15s";

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

  startTimer() {
    this.timer = setInterval(() => {
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
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
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

  goToLink(url: string) {
    // const tmp = window.open(url, "_blank");
    // var inter = window.setInterval(() => {
    //   if (tmp?.location?.href && tmp?.location?.href.match('localhost:5000') && tmp?.location?.href.match('code')) {
    //     var url = new URL(tmp.location.href);
    //     this.post = this.http.post(this.ROOT_URL + '/oauth2callback/spotify', {"code": url.searchParams.get("code"), "key": this.key}).catch(err => {
    //       return Observable.of(err);
    //     });
    //     this.post.subscribe(result => {
    //       this.connected = true;
    //       tmp?.close();
    //       window.clearInterval(inter);
    //     })
    //   } else if (tmp?.closed) {
    //     this.connected = false;
    //     this.showAlert("La connexion n'a pas aboutie", 4500);
    //     tmp?.close();
    //     window.clearInterval(inter);
    //   }
    // }, 5000)
  }
}
