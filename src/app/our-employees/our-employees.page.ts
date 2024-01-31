import { Component, OnInit } from '@angular/core';
import {OurEmployeesService} from "../our-employees/our-employees.service";
import {Global} from "../globalpath";
import {NavController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-our-employees',
  templateUrl: './our-employees.page.html',
  styleUrls: ['./our-employees.page.scss'],
})
export class OurEmployeesPage implements OnInit {

  employeeList = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public ourEmployeeService: OurEmployeesService,
              public global: Global,) {
  }

  ngOnInit(): void {
    // this.getPage(1);
    this.ourEmployeeService.getEmployeeList().then(data => {
      this.employeeList = data;
      console.log("employeeList => ", data);
    })
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

  employeeView(id) {
    console.log('going to employeeView Page with id =>', id);
    this.navCtrl.navigateForward('/employee-view', {state: id});
  }


  onDeleteRecord(id){
    alert('tobefixed');
    return;
    console.log('onDeleteRecord called!!!');
    // this.ourEmployeeService.deleteRecordService(id).then(resp => {
    //   if (resp.success === '1') {
    //     this.global.showToast('Record Deleted Successfully', 3000, 'top');
    //     this.ngOnInit();
    //   }
    //   else {
    //     this.global.showToasterror('Unable to save Record', 3000, 'top');
    //   }
    // });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OurEmployeesPage');
  }

}
