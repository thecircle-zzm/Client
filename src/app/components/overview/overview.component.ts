import { Component, OnInit } from '@angular/core';

import { STREAMS } from '../../mock/streams.mock';
import { Stream } from '../../models/stream';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  streams:Stream[] = STREAMS;
  selectedStreams:Stream[] = [];

  message: string;

  constructor() {
  }

  ngOnInit() {
    $('.selected-streams-overlay').hide();
    $('.modal').hide();
  }

  addToSelectedStreams(stream:Stream):void {
    if (this.selectedStreams.length < 4){
      if (!this.selectedStreams.find(x => x.id == stream.id)){
        this.selectedStreams.push(stream);
        this.showSelectedStreams();
      }
      else {
        this.notifyUser('alreadySelected');
      }
    } else {
      this.notifyUser('moreThanFour');
    }
  }

  showSelectedStreams():void {
    $('.selected-streams-overlay').show();
  }

  removeFromSelectedStreams(stream:Stream):boolean {
    this.selectedStreams.splice(this.selectedStreams.indexOf(stream), 1);
    this.showSelectedStreams();
    if (this.selectedStreams.length == 0){
      $('.selected-streams-overlay').hide();
    }
    return true;
  }

  changeMessage(message:string) {
    this.message = message;
    $('.modal').show();
  }

  closeModal() {
    $('.modal').hide();
  }

  notifyUser(messageType:string):void {
    switch(messageType){
      case 'alreadySelected': {
        this.changeMessage("You already selected this stream. Pick a different stream.");
      }
      case 'moreThanFour': {
        this.changeMessage("You can only select a maximum of four streams. Deselect a stream before selecting another.");
      }

    }
  }

}
