import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

Injectable({
    providedIn: "root"
})
export class SearchService {
    private filterSource = new Subject<string>();
    filter = this.filterSource.asObservable();

    setFilter(filter:string){
        this.filterSource.next(filter);
    }
}