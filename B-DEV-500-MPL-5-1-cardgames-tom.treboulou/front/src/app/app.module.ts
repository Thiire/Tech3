import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { YoutubeComponent } from './youtube/youtube.component';
import { HomeComponent } from './home/home.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { SpotifyComponent } from './spotify/spotify.component';
import { TwitchComponent } from './twitch/twitch.component';
import { BattlenetComponent } from './battlenet/battlenet.component';
import { MinecraftComponent } from './minecraft/minecraft.component';
import { TimeZoneComponent } from './time-zone/time-zone.component';
import { MoneyComponent } from './money/money.component';
import { MeteoComponent } from './meteo/meteo.component';
import { LoremComponent } from './lorem/lorem.component';

@NgModule({
  declarations: [
    AppComponent,
    YoutubeComponent,
    HomeComponent,
    AuthorizationComponent,
    SpotifyComponent,
    TwitchComponent,
    BattlenetComponent,
    MinecraftComponent,
    TimeZoneComponent,
    MoneyComponent,
    MeteoComponent,
    LoremComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
