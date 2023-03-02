import { Component, OnInit, Input, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Global } from "../common/global";

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  constructor(private http: HttpClient) { }
  @Input() data;
  ngOnInit(): void {
  }

  getPath(name) {
    if (name == "Discord")
      return "assets/networks/discord.png";
    if (name == "Twitch")
      return "assets/networks/Twitch_Full.png";
    if (name == "Facebook")
      return "assets/networks/Facebook_Full.png";
    if (name == "Spotify")
      return "assets/networks/Spotify_Full.png";
    if (name == "Youtube")
      return "assets/networks/Youtube_Full.png";
    if (name == "Imgur")
      return "assets/networks/Imgur_Full.png";
    return ""
  }
}
