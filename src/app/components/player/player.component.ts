import { Component, OnInit, Input } from '@angular/core';

declare var flvjs: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input('streamlink') streamlink: string;
  stream: string;

  constructor() {
   }

  ngOnInit() {
    this.stream = 'http://188.166.38.127:8000' + this.streamlink + '.flv';

    if (flvjs.isSupported()) {
      var videoElement = document.getElementById('videoElement');
      var flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: this.stream
      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
    }
  }

}
