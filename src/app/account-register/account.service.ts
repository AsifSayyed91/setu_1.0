import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Global} from '../globalpath';


// @Injectable()
@Injectable({
  providedIn: 'root', // You can also provide the service at the root level.
})
export class RegisterService {

  private genderList = this.globals.globallink + 'mst_gender/genderList';
  private insuranceList = this.globals.globallink + 'mst_insurance/list';
  private country = this.globals.globallink + 'mst_country/list/?';
  private state = this.globals.globallink + 'mst_state/statebyID/';
  private city = this.globals.globallink + 'mst_city/citybyID/';
  // private area = this.globals.globallink + 'mst_area/areabyID/';
  private bloodGroupList = this.globals.globallink + 'mst_bloodgroup/bloodGroupList';
  private register = this.globals.globallink + 'mst_patient/createPatient';
  private validateMobileNo = this.globals.globallink + 'mst_patient/validateMobileNo';
  private GetRecordServiceBynationalid = this.globals.globallink + 'mst_patient/getrecordservicebynationalid/?';
  private ForgotPasswordOTPByEmail = this.globals.globallink + 'mst_patient/forgotPasswordByEmail/?';
  private ForgotPasswordOTP = this.globals.globallink + 'mst_patient/forgotPassword/?';
  private ForgotUsernaemOTP = this.globals.globallink + 'mst_patient/forgotUsername/?';
  private updatePWD = this.globals.globallink + 'mst_patient/updateNewPwd/?';
  private sendUsernameSMSURL = this.globals.globallink + 'mst_patient/sendUsernameSMS/?';
  private fileupload = this.globals.globallink + 'api/upload/';
  private GetTitleList = this.globals.globallink + 'mst_title/list/?';
  private uploadDocument = this.globals.globallink + 'uploadFile/api/uploadpatientdoc/';
  private mstCompanyList = this.globals.globallink + 'mst_company/list/?';
  private nationalityList = this.globals.globallink + 'mst_nationality/list/?';
  private CheckMobileNoExist = this.globals.globallink + 'mst_user/checkExistByMobileNo?';
  private GetRecordServiceByemailid = this.globals.globallink + 'mst_patient/getrecordservicebyemailid/?';
  private cityNameService = this.globals.globallink + 'mst_city/autocomplete/';
  private cityByName = this.globals.globallink + 'mst_city/cityByName/';
  private GetAllCityList = this.globals.globallink + 'mst_city/list/?';
  private ForgotUsernaemOTPByEmail = this.globals.globallink + 'mst_patient/forgotUsernameByEmail/?';
  private GetUnitList = this.globals.globallink + 'mst_unit/list/?';
  private GetAreaList = this.globals.globallink + 'mst_area/list/';
  private GetAreaListByCityId = this.globals.globallink + 'mst_area/areaByCityId/';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient, private globals: Global) {
  }

  addfile(form) {
    // console.log(form);
    return this.http.post(this.fileupload, form, {responseType: 'text'})
      .toPromise()
      .then(response => response.toString())
      .catch(this.handleError);
  }

  getAllCityList(currentPage: any, size: any, qString: any, sort: any, col: any): Promise<any> {
    return this.http.get(this.GetAllCityList + 'page=' + currentPage + '&size=' + size + '&qString=' + qString + '&sort=' + sort + '&col=' + col)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getNationalityList(currentPage: any, size: any, qString: any, sort: any, col: any): Observable<any> {
    return this.http.get(this.nationalityList + 'page=' + currentPage + '&size=' + size + '&qString=' + qString + '&sort=' + sort + '&col=' + col)
      .pipe(retry(1), catchError(this.handleError));
  }

  registerPatient(registerDate): Observable<any> {
    return this.http.post<any>(this.register, JSON.stringify(registerDate), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  checkExistByMobileNo(mobileNo: any) {
    return this.http.get<any>(this.CheckMobileNoExist + 'mobileNo=' + mobileNo).pipe(retry(), catchError(this.handleError));
  }

  uploadDoc(model: any) {
    return this.http.post(this.uploadDocument, model, {responseType: 'text'})
      .toPromise()
      .then(response => response.toString())
      .catch(this.handleError);
  }

  getAllCompanyList(currentPage: any, size: any, qString: any, sort: any, col: any): Promise<any> {
    return this.http.get(this.mstCompanyList + 'page=' + currentPage + '&size=' + size + '&qString=' + qString + '&sort=' + sort + '&col=' + col)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  validateMobileNumber(registerDate): Observable<any> {
    return this.http.post<any>(this.validateMobileNo, JSON.stringify(registerDate), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  /* validatemarno(model): Observable<any> {
     return this.http.post<any>(this.webapi + this.Validatemarno , JSON.stringify(model), { headers: this.httpHeaders,
         observe: 'response'
       }
     ).pipe(
       tap(),
       catchError(this.handleError)
     );
   }*/
  getGenderList(): Observable<any[]> {
    return this.http.get<any>(this.genderList)
      .pipe(retry(1), catchError(this.handleError));
  }

  getInsuranceList(): Observable<any[]> {
    return this.http.get<any>(this.insuranceList)
      .pipe(retry(1), catchError(this.handleError));
  }

  getUnitList(currentPage: any, size: any, qString: any, sort: any, col: any): Promise<any> {
    return this.http.get(this.GetUnitList + 'page=' + currentPage + '&size=' + size + '&qString=' + qString + '&sort=' + sort + '&col=' + col)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getCountry(page: any, size: any): Promise<any> {
    return this.http.get(this.country + 'page=' + page + '&size=' + size, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getState(id: any): Promise<any> {
    return this.http.get(this.state + id, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getCity(id: any): Promise<any> {
    return this.http.get(this.city + id, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }


  getArea(id: any): Promise<any> {
    return this.http.get(this.GetAreaList + id, this.httpOptions)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getAreaListByCityId(cityId: number): Observable<any[]> {
    return this.http.get<any[]>(this.GetAreaListByCityId + cityId)
      .pipe(retry(1), catchError(this.handleError));
  }

  // getCityList(): Observable<any[]> {
  //   return this.http.get<any>(this.cityList)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     );
  // }

  getBloddGroupList(): Observable<any[]> {
    return this.http.get<any>(this.bloodGroupList)
      .pipe(retry(1), catchError(this.handleError));
  }

  getTitleList(currentPage: any, size: any, qString: any, sort: any, col: any): Promise<any> {
    return this.http.get(this.GetTitleList + 'page=' + currentPage + '&size=' + size + '&qString=' + qString + '&sort=' + sort + '&col=' + col)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getRecordServiceBynationalid(nationalid: any): Promise<any> {
    return this.http.get(this.GetRecordServiceBynationalid + '&qString=' + nationalid)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  forgotPasswordOTP(loginData): Observable<any> {
    return this.http.post<any>(this.ForgotPasswordOTP, JSON.stringify(loginData), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  forgotUsernameOTP(loginData): Observable<any> {
    return this.http.post<any>(this.ForgotUsernaemOTP, JSON.stringify(loginData), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  updatePassword(loginData): Observable<any> {
    return this.http.post<any>(this.updatePWD, JSON.stringify(loginData), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  sendUsernameSMS(loginData): Observable<any> {
    return this.http.post<any>(this.sendUsernameSMSURL, JSON.stringify(loginData), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getRecordServiceByemailid(mailid: any): Promise<any> {
    return this.http.get(this.GetRecordServiceByemailid + '&qString=' + mailid)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getSearchCity(cityName: any): Promise<any> {
    return this.http.get(this.cityNameService + cityName)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  getCityName(cityName: any): Promise<any> {
    return this.http.get(this.cityByName + cityName)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }

  forgotUsernameOTPByEmail(loginData): Observable<any> {
    return this.http.post<any>(this.ForgotUsernaemOTPByEmail, JSON.stringify(loginData), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  forgotPasswordOTPByemail(loginData): Observable<any> {
    return this.http.post<any>(this.ForgotPasswordOTPByEmail, JSON.stringify(loginData), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  private handleError(error: Response | any) {
    return Promise.reject(error.message || error);
  }
}
