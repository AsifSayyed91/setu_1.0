import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Global} from "../globalpath";
import {Observable} from "../../../node_modules/rxjs";
import {catchError, retry} from "rxjs/operators";


@Injectable({
  providedIn: 'root', // You can also provide the service at the root level.
})
export class ExploreService {

  private GetServiceslist = this.globals.globallink + 'mst_expoService/list';
  private GetDataByServiceId = this.globals.globallink + 'add_service/getDetailsByExpoServieId/';
  private GetDataListByServiceId = this.globals.globallink + 'add_service/getDetailsByExpoServieListId/';
  private QueryLead = this.globals.globallink + 'query_lead/create';
  private fileupload = this.globals.globallink + 'api/uploadservicegroupicon/';
  private GetUnitList = this.globals.globallink + 'mst_unit/lists';
  private insuranceList = this.globals.globallink + 'mst_insurance/list';
  private genderList = this.globals.globallink + 'mst_gender/genderList';
  private cityList = this.globals.globallink + 'mst_city/doctorCityList';
  private cityListForDubai = this.globals.globallink + 'mst_state/getCityListForDubai';
  private areaByStateID = this.globals.globallink + 'mst_area/areaByStateId/';
  private symtomList = this.globals.globallink + 'memr_symptom/list';
  private symtomLists = this.globals.globallink + 'memr_symptom/listByshowInSymtoms';
  private symtomSearchList = this.globals.globallink + 'memr_symptom/autocomplete/';

  private subdeptlists = this.globals.globallink + 'mst_speciality/getAllSpecality';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private globals: Global) {
  }

  getServiceslist(): Promise<any> {
    return this.http.get(this.GetServiceslist, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getDataByServiceId(id): Promise<any> {
    return this.http.get(this.GetDataByServiceId + id, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  addfile(form) {
    // console.log(form);
    return this.http.post(this.fileupload, form, {responseType: 'text'})
      .toPromise()
      .then(response => response.toString())
      .catch(this.handleError);
  }

  getDataListByServiceId(id): Promise<any> {
    return this.http.get(this.GetDataListByServiceId + id, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getUnitList(): Promise<any> {
    return this.http.get(this.GetUnitList, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  queryLead(appointment): Observable<any> {
    return this.http.post<any>(this.QueryLead, JSON.stringify(appointment), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }

  getSpecalityList(): Observable<any[]> {
    return this.http.get<any[]>(this.subdeptlists)
      .pipe(retry(1), catchError(this.handleError));
  }


  getCityList(): Observable<any[]> {
    return this.http.get<any[]>(this.cityList)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getCityListforDubai(): Observable<any[]> {
    return this.http.get<any[]>(this.cityListForDubai)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getAreaByState(stateId:any): Observable<any[]> {
    return this.http.get<any[]>(this.areaByStateID + stateId)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }


 /* getCityListforDubai(): Promise<any> {
    return this.http.get(this.cityListForDubai )
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }*/


  getsymtomsList(): Observable<any[]> {
    return this.http.get<any[]>(this.symtomList)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getsymtomsLists(): Observable<any[]> {
    return this.http.get<any[]>(this.symtomLists)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getsymtomsSearchList(key: any): Observable<any[]> {
    return this.http.get<any[]>(this.symtomSearchList + key)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  /* getGenderList(): Observable<any[]> {
     return this.http.get<any>(this.genderList)
       .pipe(retry(1), catchError(this.handleError));
   }*/

  getGenderList(): Promise<any> {
    return this.http.get(this.genderList)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getInsuranceList(): Promise<any> {
    return this.http.get(this.insuranceList)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }
}
