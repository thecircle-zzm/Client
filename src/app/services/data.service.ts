import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
    private url = 'http://188.166.38.127:8080/api/stream';
    private selectedStreams: any[] = [];

    constructor(private http: HttpClient){}

    addToSelectedStreams(stream: any): string {
        if (this.selectedStreams.length < 4) {
            if (!this.selectedStreams.find(x => x.sessionid == stream.sessionid)) {
                this.selectedStreams.push(stream);
                return "success";
            }
            else {
                return "alreadySelected";
            }
        } else {
            return "moreThanFour";
        }
    }

    clear(): void {
        this.selectedStreams = [];
    }

    removeFromSelectedStreams(stream: any): void{
        this.selectedStreams.splice(this.selectedStreams.indexOf(stream), 1);
    }

    getStreams(): Observable<any[]> {
        return Observable.interval(30000).flatMap(() => {
            return this.http.get<any[]>(this.url);
        });
    }

    getSelectedStreams(): any[] {
        return this.selectedStreams;
    }
}