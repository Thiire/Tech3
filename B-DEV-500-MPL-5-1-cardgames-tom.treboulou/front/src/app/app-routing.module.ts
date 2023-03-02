import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YoutubeComponent } from '../app/youtube/youtube.component';
import { TwitchComponent } from '../app/twitch/twitch.component';
import { SpotifyComponent } from '../app/spotify/spotify.component';
import { BattlenetComponent } from '../app/battlenet/battlenet.component';
import { HomeComponent } from '../app/home/home.component';
import { AuthorizationComponent } from '../app/authorization/authorization.component';
import { MoneyComponent } from '../app/money/money.component';
import { TimeZoneComponent } from '../app/time-zone/time-zone.component';
import { MinecraftComponent } from '../app/minecraft/minecraft.component';
import { MeteoComponent } from '../app/meteo/meteo.component';
import { LoremComponent } from '../app/lorem/lorem.component';

const routes: Routes = [
  {path: '', redirectTo: '/Home', pathMatch: 'full'},
  {path: 'Home', component: HomeComponent},
  {path: 'Youtube', component: YoutubeComponent},
  {path: 'Twitch', component: TwitchComponent},
  {path: 'Spotify', component: SpotifyComponent},
  {path: 'Battlenet', component: BattlenetComponent},
  {path: 'Minecraft', component: MinecraftComponent},
  {path: 'Time-zone', component: TimeZoneComponent},
  {path: 'Money', component: MoneyComponent},
  {path: 'Meteo', component: MeteoComponent},
  {path: 'Lorem', component: LoremComponent},
  {path: 'Authorization', component: AuthorizationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
