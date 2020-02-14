import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private baseUrl: string = `https://chatapi.edwisor.com/`;
  private socket;

  constructor() { 
    // literal handshake of socket with the api url
    this.socket  = io(this.baseUrl);
  }

  // events to be listened
  // 'verifyUser' event
  // To listen an event observables indeed
  verifyUser = () => {
    return Observable.create((observer) => { // observable creation
      // socket listened to verifyUser
      this.socket.on('verifyUser', (data) => { // returned some virtual data
        // observer collects the data
        observer.next(data);
      }); // socket listen end
    }).pipe(catchError(this.handleError)); // job of observable end
  } // verifyUser function end

  // 'online-user-list' event
  onlineUserList = () => {
    return Observable.create((observer) => {
      this.socket.on('online-user-list', (userList) => {
        observer.next(userList);
      }); // end socket listen
    }).pipe(catchError(this.handleError)); // end observable job
  } // end onlineUserList function

  // 'disconnect' event
  disconnect = () => {
    return Observable.create((observer) => {
      this.socket('disconnect', () => {
        observer.next();
      }); // end socket listen
    }).pipe(catchError(this.handleError)); // end observable
  } // end disconnect

  // events to listened end

  // event to be emitted
  // 'set-user' event
  setUser = (authToken) => {
    // socket emits authToken to set user online
    this.socket.emit(authToken);
  } // end of setUser

  // handle error on global level
  private handleError = (err: HttpErrorResponse) => {
    let errResponse = `Some unknown Error Occurred!`;
    if (err.error instanceof Error) {
      errResponse = `Error! message: ${err.error.message}`;
    } else {
      errResponse = `Error! statusCode: ${err.status}. Message: ${err.message}`;
    }
    console.log(errResponse);
    return throwError(errResponse);
  } // end handleError
}
