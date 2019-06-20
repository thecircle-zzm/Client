import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from 'src/app/services/data.service';

import { AlertService } from 'src/app/services/alert.service';

import { SearchService } from 'src/app/services/search.service';

import { ChatService } from '../../services/chat.service';
declare var $: any;

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss']
})
export class StreamComponent implements OnInit {

  streams: any[] = [];
  selectedStreams: any[];
  filteredStreams:any[];

  message: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dataService: DataService,
    private searchService: SearchService,
    private alertService: AlertService,
    private chatService: ChatService
  ) { }

  ngOnInit() {
    setInterval(()=>{this.dataService.getStreams().subscribe((incomingStreams)=>{ 
      let dict:Map<Object,boolean> = new Map<Object,boolean>()
      this.streams.forEach((stream)=>{
        dict.set(stream,false);
      })
      incomingStreams.forEach(stream => {
        
        if(this.streams.includes(stream)){
          dict.set(stream,true);
        }
        if(!(this.streams.filter((x)=>{return x.id==stream.id}).length>0))
        
          this.streams.push(stream);
          this.filteredStreams = this.streams;
          dict.set(stream,true);
          console.log(stream);
        
      });
      this.streams.filter((val)=>{
        return dict.get(val)
      })
    })},10000)
    this.dataService.getStreams().subscribe((incomingStreams)=>{
      let dict:Map<Object,boolean> = new Map<Object,boolean>()
      this.streams.forEach((stream)=>{
        dict.set(stream,false);
      })
      incomingStreams.forEach(stream => {
        
        if(this.streams.includes(stream)){
          dict.set(stream,true);
        }
        if(!(this.streams.filter((x)=>{return x.id==stream.id}).length>0))
        
          this.streams.push(stream);
          this.filteredStreams = this.streams;
          dict.set(stream,true);
          console.log(stream);
        
      });
      this.streams.filter((val)=>{
        return dict.get(val)
      })
    });
    this.getSelectedStreams();
    this.filteredStreams = this.streams;
    if (this.selectedStreams == undefined || this.selectedStreams.length == 0) {
      this.router.navigate(['/overview']);
    } else if (this.selectedStreams.length == 1){
      this.changeResolution(this.selectedStreams.length);
    }
    this.searchService.filter.subscribe((filter)=>{
      this.filteredStreams = this.streams.filter(stream=>{
        return stream.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase())>=0;
      })
    })
  }

  addToSelectedStreams(stream: any): void {
    this.message = this.dataService.addToSelectedStreams(stream);
    switch (this.message) {
      case 'success': {
        this.changeResolution(this.selectedStreams.length);
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

  removeFromSelectedStreams(stream: any): boolean {
    this.dataService.removeFromSelectedStreams(stream);
    this.changeResolution(this.selectedStreams.length);
    this.chatService.getChat(stream.sessionid).disconnect();
    return true;
  }

  changeMessage(message: string) {
    this.message = message;
    $('.modal').show();
  }

  closeModal() {
    $('.modal').hide();
  }

  changeResolution(selectedStreams) {
    $(function () {
      if ($('.col-6').hasClass("fullStream")) {
        $('.col-6').removeClass("fullStream");
      } else if (selectedStreams == 1) {
        $('.col-6').addClass("fullStream");
      }
    })
  }
}
