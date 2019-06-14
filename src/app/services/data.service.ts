import { Injectable } from '@angular/core';
import { Stream } from '../models/stream';
import { STREAMS } from '../mock/streams.mock';

@Injectable()
export class DataService {
    streams: Stream[] = STREAMS;
    selectedStreams: Stream[] = [];

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

    getStreams(): Stream[] {
        return this.streams;
    }

    getSelectedStreams(): Stream[] {
        return this.selectedStreams;
    }
}