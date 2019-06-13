import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from 'src/app/services/data.service';

import { Stream } from 'src/app/models/stream';

import { STREAMS } from '../../mock/streams.mock';

import { SearchService } from 'src/app/services/search.service';
import { StreamService } from '../../services/stream.service'
declare var $: any;

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  streams: Stream[] = STREAMS;
  selectedStreams: Stream[];
  limitedStreams:Stream[];

  message: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dataService: DataService,
    private streamService: StreamService,
    private searchService: SearchService
  ) { }

  ngOnInit() {
    this.getSelectedStreams();
    this.limitedStreams = this.streams;
    if (this.selectedStreams == undefined || this.selectedStreams.length == 0) {
      this.router.navigate(['/overview']);
    }
    this.searchService.filter.subscribe((filter)=>{
      this.limitedStreams = this.streams.filter(stream=>{
        return stream.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase())>=0;
      })
    })
  }

  addToSelectedStreams(stream: Stream): void {
    if (this.selectedStreams.length < 4) {
      if (!this.selectedStreams.find(x => x.id == stream.id)) {
        this.selectedStreams.push(stream);
      }
      else {
        this.notifyUser('alreadySelected');
      }
    } else {
      this.notifyUser('moreThanFour');
    }
  }

  getSelectedStreams():void {
    this.selectedStreams = this.dataService.streamData;
  }

  removeFromSelectedStreams(stream: Stream): boolean {
    this.selectedStreams.splice(this.selectedStreams.indexOf(stream), 1);
    return true;
  }

  changeMessage(message: string) {
    this.message = message;
    $('.modal').show();
  }

  closeModal() {
    $('.modal').hide();
  }

  notifyUser(messageType: string): void {
    switch (messageType) {
      case 'alreadySelected': {
        this.changeMessage("You already selected this stream. Pick a different stream.");
      }
      case 'moreThanFour': {
        this.changeMessage("You can only select a maximum of four streams. Deselect a stream before selecting another.");
      }

    }
  }

}
