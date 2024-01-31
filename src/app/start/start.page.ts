import { Component, OnInit } from '@angular/core';
import {NavController, NavParams} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              private route: ActivatedRoute,
              public router: Router,
              ) {
  }

  //
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad StartPage');
  // }

  goToHome() {
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
  }

}
