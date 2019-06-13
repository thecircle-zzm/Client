import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from 'src/app/services/data.service';

import { Stream } from 'src/app/models/stream';

import { STREAMS } from '../../mock/streams.mock';
import { AlertService } from 'src/app/services/alert.service';

declare var $: any;

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  streams: Stream[];
  selectedStreams: Stream[];

  message: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dataService: DataService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.streams = this.dataService.getStreams();
    this.getSelectedStreams();
    if (this.selectedStreams == undefined || this.selectedStreams.length == 0) {
      this.router.navigate(['/overview']);
    }
  }

  addToSelectedStreams(stream: Stream): void {
    this.message = this.dataService.addToSelectedStreams(stream);
    switch (this.message) {
      case 'success': {
        this.selectedStreams = this.dataService.getSelectedStreams();
        break;
      }
      case 'alreadySelected': {
        this.changeMessage(this.alertService.notifyUser('alreadySelected'));
        break;
      }
      case 'moreThanFour': {
        this.changeMessage(this.alertService.notifyUser('moreThanFour'));
        break;
      }
    }
  }

  getSelectedStreams():void {
    this.selectedStreams = this.dataService.getSelectedStreams();
  }

  removeFromSelectedStreams(stream: Stream): boolean {
    this.dataService.removeFromSelectedStreams(stream);
    return true;
  }

  changeMessage(message: string) {
    this.message = message;
    $('.modal').show();
  }

  closeModal() {
    $('.modal').hide();
  }

}
