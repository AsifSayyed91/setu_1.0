import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AestheticsService} from "../aesthetics/aesthetics.service";
import {Global} from "../globalpath";
import {MyRefferalsService} from "../my-refferals/my-refferals.service";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {Component, OnInit} from "@angular/core";
import {ModalController, NavController, NavParams, PopoverController} from "@ionic/angular";
import {PaginationInstance} from "ngx-pagination";
import {Router} from "@angular/router";
import {PopoverPage} from "../popover/popover.page";

@Component({
  selector: 'app-aesthetics',
  templateUrl: './aesthetics.page.html',
  styleUrls: ['./aesthetics.page.scss'],
})
export class AestheticsPage implements OnInit {
  loginUser;
  patientId;
  partnerId;
  myPartnerList = [];
  partnerListByCondition: Array<any> = [];
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };
  currentFile;
  docOriginalName;
  uploadedURL: any = {};
  aesthetics: FormGroup;
  patientimagepath = this.global.paientImgPath;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder,
              private router: Router,
              public global: Global,
              public myRefferalsService: MyRefferalsService,
              public popoverCtrl: PopoverController,
              public aestheticsService : AestheticsService,
              public appointmentService: AppointmentlistService,
              public viewCtrl: ModalController,) {
    this.aesthetics = fb.group({
      enquiry: [null, Validators.required],
      createdDate: [null, Validators.required],
      doc_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
    /* this.physiotherapyService.getPartnersByPhysiotherapy().then(data => {
       this.partnerListByCondition = data;
       console.log(" conditionally partnerListByPHysiotherapy => ", this.partnerListByCondition);
     })*/

    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1);
  }

  getPage(page) {
    this.aestheticsService.patientIdByUserId(this.loginUser.userId).then(resp => {
      this.patientId = resp.patientId;

      /* this.myRefferalsService.getPartnerListIsPrefferedTrue().then(data => {
         this.myPartnerList = data;
         console.log('getPartnerListIsPrefferedTrue => ', data);
         this.config.currentPage = page;
         this.config.totalItems = data.totalElements;
       })*/
    })
  }

  addFile(form: any) {
    console.log("form ", this.aesthetics.controls['enquiry'].value);
    console.log(form);
    const model: any = {};

    if (form.file != 0) {
      const formData: FormData = new FormData();
      formData.append('file', this.currentFile, this.currentFile.name);
      console.log("formData => ");
      console.log(formData);
      //if (this.currentFile.name != undefined){
      if(formData.has('file')) {

        this.appointmentService.addFileUplaodService(formData).then(resp => {
          this.uploadedURL = resp;
          model.duPath = this.uploadedURL;
          model.patientId = {'patientId': parseInt(this.patientId)};
          // model.partnerId = {'partnerId': parseInt(this.partnerId)};
          model.duName = form.name;
          model.duFileName = this.uploadedURL;
          model.enquiry = this.aesthetics.controls['enquiry'].value;
          this.aestheticsService.addRecord(model).then(data => {
            console.log(data);
            this.ngOnInit();
            if (data.success == '1') {
              this.global.showToast(data.msg, 1000, 'top');
              this.viewCtrl.dismiss();
            } else {
              this.aesthetics.reset();
              this.global.showToast(data.msg, 1000, 'top');
            }
          });
        });

      }
    } else {
      // this.global.showToastwaring('Please Enter Details', 1000, 'top');
      this.uploadedURL = 'no-file.png';
      model.duPath = this.uploadedURL;
      this.uploadedURL = this.global.paientImgPath + 'no-file.png';
      this.uploadedURL = 'no-file.png';
      model.patientId = {'patientId': parseInt(this.patientId)};
      model.partnerId = {'partnerId': parseInt(this.partnerId)};
      model.duName = form.name;
      model.duFileName = this.uploadedURL;
      model.enquiry = this.aesthetics.controls['enquiry'].value;
      this.aestheticsService.addRecord(model).then(data => {
        console.log(data);
        this.ngOnInit();
        if (data.success == '1') {
          this.global.showToast(data.msg, 1000, 'top');
          this.viewCtrl.dismiss();
        } else {
          this.aesthetics.reset();
          this.global.showToast(data.msg, 1000, 'top');
        }
      });
    }
  }


  onFileChange(event) {
    this.currentFile = event.target.files[0];
    this.docOriginalName = this.currentFile.name;
  }

  // popoverMenu(event: Event) {
  //   const popover = this.popoverCtrl.create(PopoverPage);
  //   popover.present({ev: event});
  // }

  async popoverMenu(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverPage,
      event: event,
      animated: true,
      showBackdrop: true
    });
    return await popover.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PhysiotherapyPage');
  }


  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

  goBack() {
    console.log("Going back");
    this.router.navigateByUrl('/explore-services');
  }
}
