// import {AutoCompleteService} from '@ionic/angular';
import {Injectable} from "@angular/core";
import { map, catchError } from 'rxjs/operators';
import {Global} from "../../globalpath";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

// s
@Injectable({
  providedIn: 'root', // You can also provide the service at the root level.
})
// export class CompleteTestService implements AutoCompleteService {
export class CompleteTestService {
  labelAttribute = "name";
  formValueAttribute = "";
  cityList: Array<any> = [];

  constructor(
              private http: HttpClient,
              public global: Global) {
  }

  getResults(keyword: string) {
    // let headers = new HttpHeaders()
    //   .set('Accept', 'application/json; charset=utf-8');
    // return this.http.get(this.global.globallink + 'mst_city/autocomplete/' + keyword,{ headers: headers}).pipe(
    //   map(result => {
    //     return result.json().record
    //       .filter(item => item.cityName.toLowerCase().startsWith(keyword.toLowerCase()))
    //   })
    //
    // );

   return this.http.get(this.global.globallink + 'mst_city/autocomplete/' + keyword)
      .pipe(map(response => JSON.stringify(response)))
      .subscribe(result => {
        this.cityList = JSON.parse(result).data;
     return this.cityList.filter(item => item.cityName.toLowerCase().startsWith(keyword.toLowerCase()))
      },(error)=>{
        console.log(error);
      });

    // return this.http.get(this.global.globallink + 'mst_city/autocomplete/' + keyword)
    //   .pipe(map(data => {})).subscribe(result => {
    //     return result.json().record
    //       .filter(item => item.cityName.toLowerCase().startsWith(keyword.toLowerCase()))
    //   });
  }
}
