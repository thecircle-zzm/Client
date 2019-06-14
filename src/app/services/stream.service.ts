import { Observable } from "rxjs";
import { STREAMS } from '../mock/streams.mock';
import { Stream } from '../models/stream';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StreamService {
    mockData = STREAMS;

    getStreams() {
        return new Observable<Stream[]>((observer)=>{
            observer.next(this.mockData);
        });
    }
}