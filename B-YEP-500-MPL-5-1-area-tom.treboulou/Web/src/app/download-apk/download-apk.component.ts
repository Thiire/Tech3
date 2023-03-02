import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-apk',
  templateUrl: './download-apk.component.html',
  styleUrls: ['./download-apk.component.scss']
})
export class DownloadApkComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    window.open("http://localhost:8080/client.apk");
  }

}
