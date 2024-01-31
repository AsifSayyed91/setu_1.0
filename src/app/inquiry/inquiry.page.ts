import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Global} from "../globalpath";
import {NavController, NavParams} from "@ionic/angular";
import {MyInquiryService} from "../inquiry/my-inquiry.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-inquiry',
  templateUrl: './inquiry.page.html',
  styleUrls: ['./inquiry.page.scss'],
})
export class InquiryPage implements OnInit {
  data: any=null ;
  patientId: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public myInquiryService: MyInquiryService,
              public global: Global,
              public fb: FormBuilder,
              private router: Router) {
    this.data = this.router.getCurrentNavigation()?.extras?.state;
    // this.data = navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InquiryPage');
    console.log(this.data);
  }

  myForm = new FormGroup({
    'enquiry': new FormControl (['', Validators.required]) ,
    'userId': new FormControl('', [Validators.required]),
    'doctorId': new FormControl('', [Validators.required]),

    'inquiryDateTime': new FormControl('', null),
    'date': new FormControl('', null),
    'time': new FormControl('', null),
  });

  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

  submit(model: any){
    console.table('inside submit',model);
    model.userId = {"userId": this.data.appointmentUserId.userId};
    model.doctorId = {"staffId": this.data.staffId};
    let dataandtime = new Date(this.data.appointmentDate+ 'T' + model.time);
    model.inquiryDateTime = new  Date(dataandtime).getTime();
    this.myInquiryService.createInquiry(model).then( data => {
      this.global.showToast(data.msg, 1000, 'top');
      this.router.navigateByUrl('/dashboard');
    });
  }

  ngOnInit(): void {
  }

  onAddRecord(model: any) {
    console.log('onrecord',model);
    model.duPath = 'no-file.png';
    model.patientId = {'patientId': parseInt(this.patientId)};
    this.myInquiryService.createInquiry(model).then(resp => {
      console.log('response =>', resp);
      if (resp.success === '1') {
        this.global.showToast('Record Added Successfully', 3000, 'top');
        this.myForm.reset();
        this.ngOnInit();
      }
      else {
        this.global.showToasterror('Unable to save Record', 3000, 'top');
      }
    });
  }
}
