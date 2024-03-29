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
    this.filteredStreams = this.streams;
    this.fillOverview();
    setInterval(()=>{this.fillOverview()},10000)
    this.searchService.filter.subscribe((filter)=>{
      this.filteredStreams = this.streams.filter(stream=>{
        console.log(stream.streamer.username)
        return stream.streamer.username.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase())>=0;
      })
    })
    setInterval(()=>{
      this.selectedStreams.forEach((stream)=>{
        this.dataService.getViewers(stream.stream.key).subscribe((viewers)=>{
          stream.viewCount=viewers.viewercount;
          this.selectedStreams[this.selectedStreams.indexOf(stream)]=stream;
          streamnum++;
        })
      })
      this.selectedStreams.forEach((stream)=>{
        console.log(stream.viewCount)
      })
    },10000)
    let streamnum = 0;
    this.streams.forEach(stream => {
      this.dataService.getViewers(stream.stream.key).subscribe((viewers)=>{
        this.streams[streamnum].viewCount=viewers.viewercount
      })
    });
    setInterval(()=>{
      streamnum=0;
      this.streams.forEach(stream => {
        this.dataService.getViewers(stream.stream.key).subscribe((viewers)=>{
          this.streams[streamnum].viewCount=viewers.viewercount
        })
      });
    },10000)
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
      let dict:Map<Object,boolean> = new Map<Object,boolean>()
      this.streams.forEach((stream)=>{
        dict.set(stream,false);
      })
      incomingStreams.forEach(stream => {
        
        if(this.streams.includes(stream)){
          dict.set(stream,true);
        }
        if(!(this.streams.filter((x)=>{return x.sessionid==stream.sessionid}).length>0))
        
          this.streams.push(stream);
          this.filteredStreams = this.streams;
          dict.set(stream,true);
          console.log(stream);
        
      });
      this.streams.filter((val)=>{
        return dict.get(val)
      })
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
