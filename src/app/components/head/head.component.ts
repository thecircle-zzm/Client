import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {
  toSearch: string;
  constructor(public router: Router, private searchService: SearchService) { }

  ngOnInit() {
  }

  search() {
    this.searchService.setFilter(this.toSearch);
  }
}
