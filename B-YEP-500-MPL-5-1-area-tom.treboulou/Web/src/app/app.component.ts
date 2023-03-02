import { Component } from '@angular/core';
import firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Web';
  constructor() {
    const config =  {
      apiKey: 'AIzaSyBiW07P447yAyaXlm36viPzU_FTPWtxRl8',
      authDomain: 'area-babz.firebaseapp.com',
      databaseURL: "https://area-babz-default-rtdb.firebaseio.com",
      projectId: "area-babz",
      storageBucket: "area-babz.appspot.com",
      messagingSenderId: "770974078352",
      appId: "1:770974078352:web:2773288b7475ab2a60cf15",
      measurementId: "G-R3MXMLZ8ED"
    };
    firebase.initializeApp(config);
  }
}
