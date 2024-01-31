import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PopoverPage} from "../popover/popover.page";
import {ExploreService} from "../explore-services/explore-services.service";
import {Global} from "../globalpath";
import {NavController, NavParams, PopoverController} from "@ionic/angular";

@Component({
  selector: 'app-diagnostics-labs',
  templateUrl: './diagnostics-labs.page.html',
  styleUrls: ['./diagnostics-labs.page.scss'],
})
export class DiagnosticsLabsPage implements OnInit {
  tab = '1';
  emailPattern = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
  // tab = '1';
  explore: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder,
              public exploreservicesService: ExploreService,
              public globals: Global,
              public popoverCtrl: PopoverController) {
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
    console.log('ionViewDidLoad DiagnosticsLabsPage');
  }

  query() {
    this.tab = '2';
  }

  sub() {
    this.navCtrl.navigateRoot('/dashboard');
  }

  onSubmitquery(exploreData) {
    this.explore.reset();
    this.exploreservicesService.queryLead(exploreData).subscribe(resp => {
      if (resp.status == 'success') {
        this.navCtrl.navigateRoot('/dashboard');
        this.globals.showToast('Mulk E Health Support team Connect with You!', 1000, 'top');
      }
    });
  }

  async popoverMenu(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: event,
    });
    return await popover.present();
  }

  ngOnInit(): void {
  }
}
