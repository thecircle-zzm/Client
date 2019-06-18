import { Injectable } from '@angular/core';
import { Stream } from '../models/stream';
import { STREAMS } from '../mock/streams.mock';
import { Observable, of } from 'rxjs'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
    private url = 'http://localhost:8080/api/stream';
    private selectedStreams: Stream[] = [];

    constructor(private http: HttpClient){}

    addToSelectedStreams(stream: Stream): string {
        if (this.selectedStreams.length < 4) {
            if (!this.selectedStreams.find(x => x.id == stream.id)) {
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

    removeFromSelectedStreams(stream: Stream): void{
        this.selectedStreams.splice(this.selectedStreams.indexOf(stream), 1);
    }

    getStreams(): Observable<any[]> {
        return this.http.get<any[]>(this.url)
    }

    getSelectedStreams(): Stream[] {
        return this.selectedStreams;
    }
}