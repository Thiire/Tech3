import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpClient, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'

export interface Post_signin {
  mail: string;
  password: string;
  username: string;
}

export interface Post_login {
  mail: string;
  password: string;
}

export interface Connected {
  code: number;
  state: boolean;
  username: string;
  key: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  state: boolean = false;
  code: number = 0;
  username: string = "";
  key: string = "";
  isExpanded: boolean = true;
  title: string = 'Dashboard';
  isVisible: boolean = false;
  public textError: string = "";

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private router:Router, private route: ActivatedRoute, public dialog: MatDialog){
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

  ngOnInit() {
    this.key = (history.state.key) ? history.state.key : "";
    this.username = (history.state.username) ? history.state.username : "";
    if (this.key.length == 0 || this.username.length == 0) {
      this.state = false;
    } else {
      this.state = true;
    }
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

  openConnection(): void {
    const dialogRef = this.dialog.open(DialogConnection, {
      width: '250px',
      data: {state: this.state, code: this.code, username: this.username, key: this.key}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.code == 202) {
        this.state = result.state;
        this.key = result.key;
        this.username = result.username;
      } else if (result.code == 401) {
        this.state = result.state;
        this.showAlert("Veuillez saisir un e-mail valide", 4500);
      } else if (result.code == 402) {
        this.state = result.state;
        this.showAlert("Veuillez saisir un mot de passe valide", 4500);
      }
    });
  }

  openSignin(): void {
    const dialogRef = this.dialog.open(DialogSignin, {
      width: '250px',
      data: {state: this.state, code: this.code, username: this.username, key: this.key}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result.code == 201) {
        this.state = result.state;
        this.key = result.key;
        this.username = result.username;
      } else if (result.code == 401) {
        this.state = result.state;
        this.showAlert("Veuillez saisir un e-mail valide", 4500);
      } else if (result.code == 402) {
        this.state = result.state;
        this.showAlert("Veuillez saisir un mot de passe valide", 4500);
      } else if (result.code == 403) {
        this.state = result.state;
        this.showAlert("Les mots de passe ne correspondent pas", 4500);
      } else if (result.code == 404) {
        this.state = result.state;
        this.showAlert("Veuillez saisir un nom d'utilisateur valide", 4500);
      } else if (result.code == 405) {
        this.state = result.state;
        this.showAlert("Le mot de passe doit faire au moins 6 charactères", 4500);
      }
    });
  }
}

@Component({
  selector: 'dialog-connection',
  templateUrl: 'dialog-connection.html',
})
export class DialogConnection implements OnInit {
  readonly ROOT_URL = 'http://localhost:8080';
  post: Observable<any>;

  constructor(
    public dialogRef: MatDialogRef<DialogConnection>, private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: Connected) {}

  ngOnInit() {}

  onOkClick(Email: string, Password: string) {
    if (Email.length == 0) {
      this.data.state = false;
      this.data.code = 401;
      return this.dialogRef.close(this.data);
    } else if (Password.length == 0) {
      this.data.state = false;
      this.data.code = 402;
      return this.dialogRef.close(this.data);
    }
    const tmp: Post_login = {
      mail: Email,
      password: Password,
    }
    this.post = this.http.post(this.ROOT_URL + '/login', tmp).catch(err => {
      return Observable.of(err);
    });
    this.post.subscribe(result => {
      if (result.error) {
        this.data.state = false;
        this.data.code = 400;
      } else {
        this.data.key = Object.keys(result.data)[0];
        this.data.username = result.data[this.data.key].username;
        this.data.code = result.code;
        this.data.state = true;
      }
      this.dialogRef.close(this.data);
    })
  }

}

@Component({
  selector: 'dialog-signin',
  templateUrl: 'dialog-signin.html',
})
export class DialogSignin implements OnInit {

  readonly ROOT_URL = 'http://localhost:8080';
  post: Observable<any>;

  constructor(
    public dialogRef: MatDialogRef<DialogSignin>, private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: Connected) {}

  ngOnInit() {}

  onOkClick(Pseudo: string, Email: string, Password: string, Password2: string) {
    if (Pseudo.length == 0) {
      this.data.state = false;
      this.data.code = 404;
      return this.dialogRef.close(this.data);
    } else if (Email.length == 0) {
      this.data.state = false;
      this.data.code = 401;
      return this.dialogRef.close(this.data);
    } else if (Password.length == 0 || Password2.length == 0) {
      this.data.state = false;
      this.data.code = 402;
      return this.dialogRef.close(this.data);
    } else if (Password != Password2) {
      this.data.state = false;
      this.data.code = 403;
      return this.dialogRef.close(this.data);
    } else if (Password.length < 6 || Password2.length < 6) {
      this.data.state = false;
      this.data.code = 405;
      return this.dialogRef.close(this.data);
    }
    const tmp: Post_signin = {
      mail: Email,
      password: Password,
      username: Pseudo
    }
    this.post = this.http.post(this.ROOT_URL + '/register', tmp).catch(err => {
      return Observable.of(err);
    });
    this.post.subscribe(result => {
      if (result.error) {
        this.data.state = false;
        this.data.code = 400;
      } else {
        this.data.key = Object.keys(result.data)[0];
        this.data.username = result.data[this.data.key].username;
        this.data.code = result.code;
        this.data.state = true;
      }
      this.dialogRef.close(this.data);
    })
  }
}