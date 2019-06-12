import { Injectable } from '@angular/core';
import { Stream } from '../models/stream';

@Injectable()
export class DataService {
    serviceData: string;
    streamData: Stream[];
}