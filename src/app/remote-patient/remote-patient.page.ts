import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Global} from "../globalpath";
import {NavController, NavParams, PopoverController} from "@ionic/angular";
import {ExploreService} from "../explore-services/explore-services.service";
import {Router} from "@angular/router";
import {PopoverPage} from "../popover/popover.page";

@Component({
  selector: 'app-remote-patient',
  templateUrl: './remote-patient.page.html',
  styleUrls: ['./remote-patient.page.scss'],
})
export class RemotePatientPage implements OnInit {
  emailPattern = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  tab = '1';
  explore: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder,
              public popoverCtrl: PopoverController,
              public exploreservicesService: ExploreService,
              public globals: Global,
              public router: Router,

              ) {
    this.explore = fb.group({
      'name': [null, Validators.required],
      'age': [null],
      'mobileno': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
      'uploadfile': [null],
      'medicalProblem': [null],
      'mstExpoService': fb.group({
        'id': [null]
      }),
      'userid': [],
      'createdate': [],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RemotePatientPage');
  }

  async popoverMenu(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: event,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }

  query() {
    this.tab = '2';
  }

  sub() {
    this.router.navigateByUrl('/dashboard');
  }

  onSubmitquery(exploreData) {
    this.explore.reset();
    this.exploreservicesService.queryLead(exploreData).subscribe(resp => {
      if (resp.status == 'success') {
        this.router.navigateByUrl('/dashboard');
        this.globals.showToast('Mulk E Health Support team Connect with You!', 1000, 'top');
      }
    });
  }

  ngOnInit(): void {
  }
}
