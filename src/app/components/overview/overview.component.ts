import { Component, OnInit } from '@angular/core';

import { STREAMS } from '../../mock/streams.mock';
import { Stream } from '../../models/stream';

declare var $: any;

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  streams:Stream[] = STREAMS;
  selectedStreams:Stream[] = [];

  constructor() {
  }

  ngOnInit() {
    $('.selected-streams-overlay').hide();
  }

  addToSelectedStreams(stream:Stream):boolean {
    if (this.selectedStreams.length < 4){
      this.selectedStreams.push(stream);
      this.showSelectedStreams();
      return true;
    }
    return false;
  }

  showSelectedStreams():void {
    $('.selected-streams-overlay').show();
  }

  removeFromSelectedStreams(stream:Stream):boolean {
    this.selectedStreams.splice(this.selectedStreams.indexOf(stream), 1);
    this.showSelectedStreams();
    return true;
  }

}
