import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PopoverPage} from "../popover/popover.page";
import {Global} from "../globalpath";
import {MyLabreportsService} from "../my-labreports/my-labreports.service";
import {MyRadiologyService} from "../my-radiology/my-radiology.service";
import {ModalController, NavController, NavParams, PopoverController} from "@ionic/angular";
import {AppointmentlistService} from "../appointmentlist/appointmentlist.service";
import {PaginationInstance} from "ngx-pagination";
import {FileuploadformyradiologyPage} from "../fileuploadformyradiology/fileuploadformyradiology.page";

@Component({
  selector: 'app-my-radiology',
  templateUrl: './my-radiology.page.html',
  styleUrls: ['./my-radiology.page.scss'],
})
export class MyRadiologyPage implements OnInit {
  loginUser;
  /*  myRadiologyId:any;*/
  myRadiologyList = [];
  patientId;
  pagination: boolean = false;
  appId;
  image_path;
  docOriginalName;
  currentFile;
  uploadedURL: any = {};
  Category: Array<any> = [];
  userDetails;
  imageFileName;
  DocumentList = [];
  public config: PaginationInstance = {
    id: 'advanced',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 1
  };
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
    Categary: new FormControl('', null),
  });

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public myRadiologyService: MyRadiologyService,
              public global: Global,
              public viewCtrl: ModalController,
              public appointmentService: AppointmentlistService,
              public myLabReportsService: MyLabreportsService,
              public popoverCtrl: PopoverController) {
    this.appId = this.navParams.get('appId');
  }

  ngOnInit() {
    this.loginUser = JSON.parse(localStorage.getItem('userDetails')|| '{}');
    this.getPage(1);

    this.myLabReportsService.getDocumentList().then(resp => {
      console.log("doc", resp);

      this.DocumentList = resp;
      console.log("doc", resp);
    });
  }

  onFileChange(event) {
    this.currentFile = event.target.files[0];
    this.docOriginalName = this.currentFile.name;
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



  ionViewDidLoad() {
    console.log('ionViewDidLoad MyRadiologyPage');
  }


  doRefresh(event) {
    setTimeout(() => {
      this.ngOnInit();
      event.complete();
    }, 2000);
  }

  /* radiologies_view(id) {
     let medication_view = this.modalCtrl.create(MyRadiologyviewPage, {myRadiologyId: id});
     medication_view.present();
   }
 */
  radiologies_view(id) {
    console.log(id);
    this.navCtrl.navigateForward('/my-radiologyview', {state: id});
  }


 async ViewImage(imgp, name) {
    let medication_view = await  this.modalCtrl.create({
      component: FileuploadformyradiologyPage,
   componentProps: {
     imagepath: imgp,
     name:name
   }
 });
    medication_view.present();
  }

  /* takephoto(id) {
     this.ngOnInit()
     let medication_view = this.modalCtrl.create(FileuploadformyradiologyPage, {appId: id});
     medication_view.present();
   }*/

  submit(form: any) {
    if (form.file != 0) {
      const formData: FormData = new FormData();
      const model: any = {};
      formData.append('file', this.currentFile, this.currentFile.name);
      this.appointmentService.addFileUplaodService(formData).then(resp => {
        this.uploadedURL = resp;
        // model.duDcId = {'dcId': form.Categary};
        model.duPath = this.uploadedURL;
        model.patientId = {'patientId': this.patientId};
        model.duName = form.name;
        model.duFileName = this.uploadedURL;
        this.appointmentService.addRecordForRadiology(model).then(data => {
          this.ngOnInit();
          if (data.success == '1') {
            this.global.showToast(data.msg, 1000, 'top');
            this.myForm.reset();
            this.viewCtrl.dismiss();
            //  this.myForm.get('Categary')?.setValue('0');
          } else {
            this.myForm.reset();
            //this.myForm.get('Categary')?.setValue('0');
            this.global.showToast(data.msg, 1000, 'top');
          }
        });
      });
    } else {
      this.global.showToastwaring('Please Enter Details', 1000, 'top');
    }
  }

  getPage(page) {
    this.config.currentPage = page;
    this.myLabReportsService.patientIdByUserId(this.loginUser.userId).then(resp => {
      this.patientId = resp.patientId;
      console.log(' patient Id => ',  this.patientId)
      this.myRadiologyService.getRadiologyListByPatient(this.patientId).then(data => {
        if (data) {
          this.pagination = true;
          this.myRadiologyList = data;
          console.log("Radiology list => " , data);
          this.config.currentPage = page;
          this.config.totalItems = data.totalElements;
        } else {
          this.pagination = true;
        }
      })
    })
  }

  goBack() {
    console.log("Going back To Dashboard!!!");
    this.navCtrl.navigateRoot('/dashboard');
  }

}

