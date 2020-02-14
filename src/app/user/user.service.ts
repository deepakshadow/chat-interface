import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from './user';

@Injectable({
  providedIn: "root"
})
export class UserService {
  private baseUrl: string = `https://chatapi.edwisor.com/api/v1/users`;

  constructor(private _http: HttpClient) {}

  // post request to send signUp information
  signUpFunction = (data: User): Observable<any> => {
    const params = new HttpParams()
      .set("firstName", data.firstName)
      .set("lastName", data.lastName)
      .set("email", data.email)
      .set("mobileNumber", data.mobileNumber)
      .set("password", data.password)
      .set("apiKey", data.apiKey);

    return this._http
      .post(`${this.baseUrl}/signup`, params)
      .pipe(catchError(this.errorHandle));
  };

  // post request to send the login credentials
  loginFunction = (data: User): Observable<any> => {
    const params = new HttpParams()
      .set("email", data.email)
      .set("password", data.password);
    return this._http
      .post(`${this.baseUrl}/login`, params)
      .pipe(catchError(this.errorHandle));
  };

  // function to set the user info in local storage
  setInfoInLocalStorage = data => {
    localStorage.setItem("userInfo", JSON.stringify(data));
  };

  // function to get the user info from local storage
  getUserInfoFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("userInfo"));
  };

  // global error handler
  private errorHandle = (err: HttpErrorResponse) => {
    let errResponse = `Some Unknown Error Occurred!`;
    if (err.error instanceof Error) {
      errResponse = `Error Message: ${err.message}`;
    } else {
      errResponse = `Error! Status Code: ${err.status}, Message: ${err.message}`;
    }
    return throwError(errResponse);
  };
}
