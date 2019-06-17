import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  notifyUser(messageType: string): string {
    switch (messageType) {
      case 'alreadySelected': {
        return "You already selected this stream. Pick a different stream.";
        break;
      }
      case 'moreThanFour': {
        return "You can only select a maximum of four streams. Deselect a stream before selecting another.";
        break;
      }
      case 'badCrypto': {
        return "Certificatss cannot be verified, please contact the owners."
      }
      case 'noCrypto': {
        return "Certificates cannot be verified, due to no support."
      }

    }
  }
}
