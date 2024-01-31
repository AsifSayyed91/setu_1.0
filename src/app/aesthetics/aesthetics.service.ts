import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from '../globalpath';


@Injectable()
export class AestheticsService {

  private getPatientId = this.globals.globallink + 'mst_patient/getPatientIdByUserId/';
  private create = this.globals.globallink + 'aesthetics/create/';
  private aestheticsList = this.globals.globallink + 'aesthetics/list/';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient,
              private globals: Global) {
  }

  addRecord(model: any): Promise<any> {
    return this.http.post(this.create, model, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getAestheticList():Promise<any>{
    return this.http.get(this.aestheticsList,this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  patientIdByUserId(user_id: any): Promise<any> {
    return this.http.put(this.getPatientId + user_id, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }

}
