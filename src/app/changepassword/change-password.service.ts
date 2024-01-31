import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from '../globalpath';

@Injectable()
export class ChangePasswordService {

  private ChangePassword = this.globals.globallink + 'change_password/change_password/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private globals: Global) {
  }

  changePassword1(list): Promise<any> {
    return this.http.post<any>(this.ChangePassword, JSON.stringify(list), this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }
}
