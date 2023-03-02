import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Global } from "../common/global";
import { LocalStorageService } from '../common/local-storage.service';

@Component({
  selector: 'app-creation',
  templateUrl: './creation.component.html',
  styleUrls: ['./creation.component.scss']
})
export class CreationComponent implements OnInit {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }
  @Output() change: EventEmitter<number> = new EventEmitter();
  app1 = null;
  app2 = null;
  lastStep1 = null;
  lastStep2 = null;
  selected = null;
  selected2 = null;
  selectedInput = null;
  selected2Input = null;
  isConnected = false;
  firstConnect = false;
  secondConnect = false;
  allArgSelect = null;
  allArgSelect2 = null;
  
  args1 = [];

  args2 = [];
  networks: any;

  // networks = [{"name": "twitter", "actions": [{"args": [], "name": "liker un tweet"}, {"args": [], "name": "recevoir un message"}], "reactions": [{"args": [{"methode": "getTwitterFriendsList", "placeholder": "destinataire", "type": "list"}, {"methode": "", "placeholder": "message", "type": "string"}], "name": "poster un tweet"}]}, {"name": "facebook", "actions": [{"args": [], "name": "liker un post"}, {"args": [], "name": "recevoir un message"}], "reactions": [{"args": [{"methode": "getFacebookFriendsList", "placeholder": "destinataire", "type": "list"}, {"methode": "", "placeholder": "message", "type": "string"}], "name": "créer un post"}]}, {"name": "spotify", "actions": [{"args": [], "name": "liker une playlist"}], "reactions": [{"args": [{"methode": "", "placeholder": "nom de playlist", "type": "string"}], "name": "creer une playlist"}]}, {"name": "youtube", "actions": [{"args": [], "name": "s'abonner a une chaine"}, {"args": [{"methode": "getYoutubeVideo", "placeholder": "vidéo", "type": "list"}], "name": "recevoir un commentaire"}], "reactions": []}, {"name": "twitch", "actions": [{"args": [], "name": "suivre un compte"}], "reactions": [{"args": [{"methode": "", "placeholder": "nom de compte", "type": "string"}, {"methode": "", "placeholder": "message", "type": "string"}], "name": "envoyer un message"}]}];

  ngOnInit(): void {
    this.getNetworks();
    // for (let i in this.networks) {
    //   if (this.networks[i].name == "twitter")
    //     this.networks[i]['path'] = "assets/networks/Twitter_Full.png";
    //   if (this.networks[i].name == "facebook")
    //     this.networks[i]['path'] = "assets/networks/Facebook_Full.png";
    //   if (this.networks[i].name == "spotify")
    //     this.networks[i]['path'] = "assets/networks/Spotify_Full.png";
    //   if (this.networks[i].name == "youtube")
    //     this.networks[i]['path'] = "assets/networks/Youtube_Full.png";
    //   if (this.networks[i].name == "twitch")
    //     this.networks[i]['path'] = "assets/networks/Twitch_Full.png";
    //   if (this.networks[i].name == "discord")
    //     this.networks[i]['path'] = "assets/networks/discord.png";
    // }
  }

  connect1() {
    if (this.app1.name == "Discord") {
      this.OauthDiscord(1);
      
    }
    if (this.app1.name == "Twitch") {
      this.OauthTwitch(1);

    }
    if (this.app1.name == "Facebook") {
      this.OauthFacebook(1);

    }
    if (this.app1.name == "Spotify") {
      this.OauthSpotify(1);

    }
    if (this.app1.name == "Youtube") {
    }
    if (this.app1.name == "Imgur") {
      this.OauthImgur(1);

    }
    if (this.app1.name == "Yammer") {
      this.OauthYammer(1);

    }
  }

  connect2() {
    if (this.app2.name == "Discord") {
      this.OauthDiscord(2);
    }
    if (this.app2.name == "Twitch") {
      this.OauthTwitch(2);

    }
    if (this.app2.name == "Facebook") {
      this.OauthFacebook(2);

    }
    if (this.app2.name == "Spotify") {
      this.OauthSpotify(2);

    }
    if (this.app2.name == "Youtube") {
    }
    if (this.app2.name == "Imgur") {
      this.OauthImgur(2);

    }
    if (this.app2.name == "Yammer") {
      this.OauthYammer(2);

    }
  }

  getNetworks() 
  {
    this.http.get('https://area-babyb.herokuapp.com/services').subscribe((res) => {
      this.networks = res;
      for (let i in this.networks) {
        if (this.networks[i].name == "Discord")
          this.networks[i]['path'] = "assets/networks/discord.png";
        if (this.networks[i].name == "Twitch")
          this.networks[i]['path'] = "assets/networks/Twitch_Full.png";
        if (this.networks[i].name == "Facebook")
          this.networks[i]['path'] = "assets/networks/Facebook_Full.png";
        if (this.networks[i].name == "Spotify")
          this.networks[i]['path'] = "assets/networks/Spotify_Full.png";
        if (this.networks[i].name == "Youtube")
          this.networks[i]['path'] = "assets/networks/Youtube_Full.png";
        if (this.networks[i].name == "Imgur")
          this.networks[i]['path'] = "assets/networks/Imgur_Full.png";
        if (this.networks[i].name == "Yammer")
          this.networks[i]['path'] = "assets/networks/Yammer_Full.png";
      }
    });
  }

  OauthOffice(nb: number) 
  {
    var scope = 'email openid Calendars.ReadWrite Chat.ReadWrite ChatMessage.Read ChatMessage.Send Contacts.ReadWrite Files.ReadWrite.All Mail.ReadWrite Notes.ReadWrite.All';
    let handleWindow = window.open('https://login.microsoftonline.com/common/oauth2/v2.0/authorize'
    + '?response_type=code'
    + '&response_mode=' + 'query'
    + '&client_id=' + Global.ID_APP_OFFICE
    + '&scope=' + scope
    + '&redirect_uri=http://localhost:8081/login');
    let intervalId = window.setInterval(() => {
      var url = new URL(handleWindow?.location?.href);
      var code = url.searchParams.get('code');
      console.log(handleWindow.location.href);
      if (handleWindow?.location?.href?.match('code')) {
        code = handleWindow.location.href.slice(handleWindow.location.href.indexOf("?code=") + 6, handleWindow.location.href.indexOf("&", handleWindow.location.href.indexOf("?code=")))
        console.log(code);
        console.log(this.localStorageService.get("email"));

        this.http.post('https://area-babyb.herokuapp.com/officeRedirect', JSON.stringify({
              code: code,
              email: this.localStorageService.get("email")
          }), {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
          }).subscribe((res) => {
            console.log(res);
            if (nb == 1)
              this.test1();
            else
              this.test2();
          })
          handleWindow.close();
          clearInterval(intervalId);
      }
    });
  }

  OauthDiscord(nb: number)
  {
    var scope = 'identify%20email%20connections%20guilds%20gdm.join%20webhook.incoming%20messages.read';
    let handleWindow = window.open('https://discord.com/oauth2/authorize'
    + '?response_type=code'
    + '&permissions=' + '1879125232'
    + '&client_id=' + Global.CLIENT_ID_DISCORD
    + '&scope=' + scope
    + '&redirect_uri=http://localhost:8081/login');
    let intervalId = window.setInterval(() => {
      var url = new URL(handleWindow?.location?.href);
      var code = url.searchParams.get('code');
      console.log(handleWindow.location.href);
      if (handleWindow?.location?.href?.match('code')) {
        code = handleWindow.location.href.slice(handleWindow.location.href.indexOf("?code=") + 6, handleWindow.location.href.indexOf("&", handleWindow.location.href.indexOf("?code=")));
        var guild = handleWindow.location.href.slice(handleWindow.location.href.indexOf("&guild_id=") + 10);
        console.log(code);
        console.log(this.localStorageService.get("email"));

        this.http.post('https://area-babyb.herokuapp.com/discordRedirect', {
              code: code,
              email: this.localStorageService.get("email")
          }, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'id': guild
          }
          }).subscribe((res) => {
            console.log(res);
            if (nb == 1)
              this.test1();
            else
              this.test2();
          })
          handleWindow.close();
          clearInterval(intervalId);
      }
    });
  }

  OauthFacebook(nb: number)
  {
    var scope = 'email,user_likes,groups_access_member_info,instagram_basic,instagram_content_publish,instagram_manage_comments,pages_manage_posts,pages_messaging,pages_read_engagement,pages_read_user_content,pages_show_list,public_profile,publish_to_groups,user_friends,user_link,user_photos,user_videos';
    let handleWindow = window.open('https://www.facebook.com/v10.0/dialog/oauth'
    + '?response_type=code'
    + '&client_id=' + Global.FACEBOOK_ID_APP
    + '&scope=' + scope
    + '&redirect_uri=http://localhost:8081/login');
    let intervalId = window.setInterval(() => {
      var url = new URL(handleWindow?.location?.href);
      var code = url.searchParams.get('code');
      console.log(handleWindow.location.href);
      if (handleWindow?.location?.href?.match('code')) {
        code = handleWindow.location.href.slice(handleWindow.location.href.indexOf("?code=") + 6);
        console.log(code);
        console.log(this.localStorageService.get("email"));

        this.http.post('https://area-babyb.herokuapp.com/facebookRedirect', JSON.stringify({
              code: code,
              email: this.localStorageService.get("email")
          }), {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          }
          }).subscribe((res) => {
            console.log(res);
            if (nb == 1)
              this.test1();
            else
              this.test2();
          })
          handleWindow.close();
          clearInterval(intervalId);
      }
    });
  }

  OauthImgur(nb: number)
  {
    let handleWindow = window.open('https://api.imgur.com/oauth2/authorize'
    + '?response_type=token'
    + '&client_id=' + Global.CLIENT_ID_IMGUR);
    let intervalId = window.setInterval(() => {
      var url = new URL(handleWindow?.location?.href);
      var access_token = url.searchParams.get('access_token');
      console.log(handleWindow.location.href);
      if (handleWindow?.location?.href?.match('access_token')) {
        access_token = handleWindow.location.href.slice(handleWindow.location.href.indexOf("#access_token=") + 14, handleWindow.location.href.indexOf("&", handleWindow.location.href.indexOf("#access_token=")))
        console.log(this.localStorageService.get("email"));

        this.http.post('https://area-babyb.herokuapp.com/addUserService', JSON.stringify({
              name: "Imgur",
              connected: true,
              token: access_token,
              token_secret: ""
          }), {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'email': this.localStorageService.get("email")
          }
          }).subscribe((res) => {
            console.log(res);
            if (nb == 1)
              this.test1();
            else
              this.test2();
          })
          handleWindow.close();
          clearInterval(intervalId);
      }
    });
  }

  OauthSpotify(nb: number) 
  {
    var scope = 'user-library-modify user-follow-modify user-read-private user-read-email playlist-modify-private user-follow-modify playlist-modify-public user-library-read';
    let handleWindow = window.open('https://accounts.spotify.com/authorize'
    + '?response_type=code'
    + '&client_id=' + Global.CLIENT_ID_SPOTIFY
    + '&scope=' + scope
    + '&redirect_uri=http://localhost:8081/login');
    let intervalId = window.setInterval(() => {
      var url = new URL(handleWindow?.location?.href);
      var code = url.searchParams.get('code');

      console.log(this.localStorageService.get("email"));
      if (handleWindow?.location?.href?.match('code')) {
        this.http.post('https://area-babyb.herokuapp.com/spotifyRedirect', {
            "code": code,
            "email": this.localStorageService.get("email")
        }, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS"
          }
          }).subscribe((res) => {
            console.log(res);
            if (nb == 1)
              this.test1();
            else
              this.test2();
          })
        handleWindow.close();
        clearInterval(intervalId);
      }
    });
  }

  OauthYammer(nb: number) 
  {
    let handleWindow = window.open('https://www.yammer.com/oauth2/authorize'
    + '?response_type=code'
    + '&client_id=bCsVCarsqNIEoQhTOIldQ'
    + '&redirect_uri=http://localhost:8081');
    let intervalId = window.setInterval(() => {
      var url = new URL(handleWindow?.location?.href);
      var code = url.searchParams.get('code');

      console.log(this.localStorageService.get("email"));
      if (handleWindow?.location?.href?.match('code')) {
        this.http.post('https://area-babyb.herokuapp.com/yammerRedirect', {
            "code": code,
            "email": this.localStorageService.get("email")
        }, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS"
          }
          }).subscribe((res) => {
            console.log(res);
            if (nb == 1)
              this.test1();
            else
              this.test2();
          })
        handleWindow.close();
        clearInterval(intervalId);
      }
    });
  }

  OauthTwitch(nb: number)
  {
    var scope = 'analytics:read:games bits:read channel:edit:commercial channel:manage:broadcast channel:manage:extensions channel:manage:redemptions channel:read:hype_train channel:read:redemptions channel:read:stream_key channel:read:subscriptions clips:edit user:edit user:edit:follows user:read:broadcast user:read:email';
    let handleWindow = window.open('https://id.twitch.tv/oauth2/authorize'
    + '?response_type=token'
    + '&client_id=' + Global.ID_CLIENT_TWITCH
    + '&scope=' + scope
    + '&redirect_uri=http://localhost:8081/login');
    let intervalId = window.setInterval(() => {
      var url = new URL(handleWindow?.location?.href);
      var access_token = url.searchParams.get('access_token');
      console.log(handleWindow.location.href);
      if (handleWindow?.location?.href?.match('access_token')) {
        access_token = handleWindow.location.href.slice(handleWindow.location.href.indexOf("#access_token=") + 14, handleWindow.location.href.indexOf("&", handleWindow.location.href.indexOf("#access_token=")))
        console.log(this.localStorageService.get("email"));

        this.http.post('https://area-babyb.herokuapp.com/addUserService', JSON.stringify({
              name: "Twitch",
              connected: true,
              token: access_token,
              token_secret: ""
          }), {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'email': this.localStorageService.get("email")
          }
          }).subscribe((res) => {
            console.log(res);
            if (nb == 1)
              this.test1();
            else
              this.test2();
          })
          handleWindow.close();
          clearInterval(intervalId);
      }
    });
  }

  test1() {
    this.firstConnect = true;
    this.isConnected = this.firstConnect && this.secondConnect ? true : false;
  }

  test2() {
    this.secondConnect = true;
    this.isConnected = this.firstConnect && this.secondConnect ? true : false;
  }

  getData(arg) {
    if (!this.allArgSelect) {
      this.http.get('https://area-babyb.herokuapp.com/' + arg.method, {
        headers: {
          'email': this.localStorageService.get("email")
        }
      }).subscribe((res) => {
        console.log(res);
        this.allArgSelect = res;
      })
    }
  }

  getData2(arg) {
    if (!this.allArgSelect2) {
      this.http.get('https://area-babyb.herokuapp.com/' + arg.method, {
        headers: {
          'email': this.localStorageService.get("email")
        }
      }).subscribe((res) => {
        this.allArgSelect2 = res;
      })
    }
  }

  getValue(arg) {
    // console.log(arg);
    this.getData(arg);
    return this.allArgSelect
  }

  getValue2(arg) {
    this.getData2(arg);
    return this.allArgSelect2
    // this.http.get('https://area-babyb.herokuapp.com/' + )
    // return arg.
  }

  submit() {
    console.log("ACTION => ", this.selected);
    console.log("REACTION => ",  this.selected2);
    this.args1.push(this.selected ? this.selected : this.selectedInput);
    this.args2.push(this.selected2 ? this.selected2 : this.selected2Input);
    this.http.post("https://area-babyb.herokuapp.com/addArea", 
    {
      "action": {
        "args": this.args1,
        "name": this.lastStep1.name,
        "network": this.app1.name
      },
      "reaction": {
        "args": this.args2,
        "name": this.lastStep2.name,
        "network": this.app2.name
      }
    }, 
    {
      headers: {
        'email': this.localStorageService.get("email")
      }
    }).subscribe((res) => {
      console.log(res);
      this.change.emit(5);
      this.app1 = null;
      this.app2 = null;
      this.lastStep1 = null;
      this.lastStep2 = null;
      this.selected = null;
      this.selected2 = null;
      this.isConnected = false;
      this.firstConnect = false;
      this.secondConnect = false;
      this.args1 = [];
      this.args2 = [];
    });
  }

}
