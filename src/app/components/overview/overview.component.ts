import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { DataService } from '../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';
import { AlertService } from 'src/app/services/alert.service';

declare var $: any;

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  streams:any[] = [];
  filteredStreams:any[];
  selectedStreams:any[];

  message: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private dataService: DataService,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.dataService.clear();
    $('.selected-streams-overlay').hide();
    $('.modal').hide();
    this.fillOverview();
    this.searchService.filter.subscribe((filter)=>{
      this.filteredStreams = this.streams.filter(stream=>{
        return stream.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase())>=0;
      })
    })
  }

  addToSelectedStreams(stream: any): void {
    this.message = this.dataService.addToSelectedStreams(stream);
      switch(this.message){
        case 'success': {
          this.selectedStreams = this.dataService.getSelectedStreams();
          this.showSelectedStreams();
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

  showSelectedStreams():void {
    $('.selected-streams-overlay').fadeIn(100);
  }

  removeFromSelectedStreams(stream:any):boolean {
    this.dataService.removeFromSelectedStreams(stream);
    this.showSelectedStreams();
    if (this.selectedStreams.length == 0){
      $('.selected-streams-overlay').hide();
    }
    return true;
  }

  fillOverview() {
    this.dataService.getStreams().subscribe((incomingStreams) => {
      incomingStreams.forEach(stream => {
        if (!this.streams.includes(stream)) {
          this.streams.push(stream);
          console.log(stream);
        }
      });
    })
  }

  changeMessage(message:string) {
    this.message = message;
    $('.modal').fadeIn(300);
  }

  closeModal() {
    $('.modal').hide();
  }

  navigateToStream():void {
    this.router.navigate(['/stream']);
  }

}
