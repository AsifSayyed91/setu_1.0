import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Global} from "../globalpath";

@Injectable()
export class LoginService {
  private loginURL = this.globals.globallink + 'loginaction/loginUser';
  private validateMobileNo = this.globals.globallink + 'mst_patient/validateMobileNo';
  private GetRecordServiceBynationalid = this.globals.globallink + 'mst_patient/getrecordservicebynationalid/?';
  private ForgotPasswordOTP = this.globals.globallink + 'mst_patient/forgotPassword/?';
  private ForgotUsernaemOTP = this.globals.globallink + 'mst_patient/forgotUsername/?';
  private updatePWD = this.globals.globallink + 'mst_patient/updateNewPwd/?';
  private sendUsernameSMSURL = this.globals.globallink + 'mst_patient/sendUsernameSMS/?';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private globals: Global) {
  }

  login(loginData): Observable<any> {
    return this.http.post<any>(this.loginURL, JSON.stringify(loginData), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  getEmployees(): Observable<any> {
    return this.http.get<any>(this.loginURL + '/loginUser')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }


  validateMobileNumber(registerDate): Observable<any> {
    return this.http.post<any>(this.validateMobileNo, JSON.stringify(registerDate), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getRecordServiceBynationalid(nationalid: any): Promise<any> {
    return this.http.get(this.GetRecordServiceBynationalid + '&qString=' + nationalid)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  forgotPasswordOTP(loginData): Observable<any> {
    return this.http.post<any>(this.ForgotPasswordOTP, JSON.stringify(loginData), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  forgotUsernameOTP(loginData): Observable<any> {
    return this.http.post<any>(this.ForgotUsernaemOTP, JSON.stringify(loginData), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  updatePassword(loginData): Observable<any> {
    return this.http.post<any>(this.updatePWD, JSON.stringify(loginData), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  sendUsernameSMS(loginData): Observable<any> {
    return this.http.post<any>(this.sendUsernameSMSURL, JSON.stringify(loginData), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }
}
