import { Component, OnInit } from '@angular/core';
import {OurEmployeesService} from "../our-employees/our-employees.service";
import {NavController, NavParams} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.page.html',
  styleUrls: ['./employee-view.page.scss'],
})
export class EmployeeViewPage implements OnInit {

  employeeId;
  employeeList = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private router: Router,
              public ourEmployeeService: OurEmployeesService) {
    this.employeeId = this.router.getCurrentNavigation()?.extras?.state;
    console.log("this.employeeId", this.employeeId)
  }

  ngOnInit(): void {
    this.ourEmployeeService.getEmployeeList().then(data => {
      this.employeeList = data;
      console.log("employeeList => ", data);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmployeeViewPage');
  }
}
