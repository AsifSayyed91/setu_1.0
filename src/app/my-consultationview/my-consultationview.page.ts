import { Component, OnInit } from '@angular/core';
import {MyConsultationviewService} from "../my-consultationview/my-consultationview.service";
import {Global} from "../globalpath";
import {ModalController, NavController, NavParams, Platform} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-my-consultationview',
  templateUrl: './my-consultationview.page.html',
  styleUrls: ['./my-consultationview.page.scss'],
})
export class MyConsultationviewPage implements OnInit {
   timelineId: any;
  url;
  data: any = null;
  pdfObj = null;
  public linkSource: any;
  public currentPatient: any = {};
  public currentPatientId: any;
  public currentVisit: any = {};
  timeline: any = {};
  mstUnit: any = {};
  symptomName: any;
  temrVisitHistory: any = {};
  chipComplaintes: Array<any> = [];
  chipSymptoms: any[] = [];
  chipAllergies: any[] = [];
  allergyList: Array<any> = [];
  investigationService: Array<any> = [];
  diagonasisArray: Array<any> = [];
  currentPrescription: any = {};
  filteredPrescription: Array<any> = [];
  temrVitalList: Array<any> = [];
  clinicalProcedureList: Array<any> = [];
  sympname: Boolean = false;
  referalLatterList: Array<any> = [];
  usersign_url = this.global.paientImgPath;
  tempobj: any={};
  // private plt: Platform, private file: File, private fileOpener: FileOpener,
  constructor(public navCtrl: NavController,
              public platform: Platform,
              private router: Router,
              public myConsultationviewService: MyConsultationviewService,
              public viewCtrl: ModalController,
              public global: Global,
              private route: ActivatedRoute,
              public navParams: NavParams) {

    this.data = this.router.getCurrentNavigation()?.extras?.state;
    this.timelineId = this.data.timelineId;


    this.getTimelineDetails();

    // this.route.params.subscribe(params => {
    //   this.timelineId = params['timelineId'];
    // });

    // this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
    //   let nav = this.app.getActiveNav();
    //   let view = nav.getActive().instance.MyConsultationPage;
    //   if (view == MyConsultationPage) {
    //     //You are in modal
    //     console.log("gvhgbj view1");
    //   } else {
    //     //You are not in modal
    //     console.log("gvhgbj view2");
    //   }
    // });


  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad MyConsultationviewPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  // getTimelineDetails() {
  //   this.myConsultationviewService.getTimelineRecordService(this.timelineId)
  //     .subscribe(resp => {
  //       console.log('Resp0', resp)
  //       this.timeline = resp;
  //       this.getUnitDetailsById(this.timeline.timelineVisitId.visitUnitId.unitId);
  //       if (this.timeline.timelineEMRFinalStaffId.staffSignName === '') {
  //         this.timeline.timelineEMRFinalStaffId.staffSignName = null;
  //       }
  //       if (this.linkSource === 'ipd') {
  //         // this.getVisit();
  //       }
  //       else {
  //         this.currentPatient = this.timeline.timelineVisitId.visitPatientId;
  //         this.currentPatientId = this.timeline.timelineVisitId.visitPatientId.patientId;
  //         this.currentVisit = this.timeline.timelineVisitId;
  //         //   this.getUnitDetailsById(this.unitid);
  //         this.getVisitAllergies(this.currentPatientId);
  //       }
  //       this.getHistory();
  //       this.getChiefCompaints();
  //       this.getSymptoms();
  //       this.getNonDrugAllergies();
  //       this.getVitals();
  //       this.getDiagonasis();
  //       this.getInvestigation();
  //       this.getPrespription();
  //       this.getClinicalProcedure();
  //       // this.getOtRequestList();
  //       // this.getClinicalFinding();
  //       // this.getDoctorsNote();
  //       this.getEmrReferringLetters();
  //     });
  // }

  getTimelineDetails() {


    this.myConsultationviewService.getTimelineRecordService(this.timelineId)
      .subscribe(
        (resp: any) => {
          console.log('kanchan misal',this.timelineId);

        this.timeline = resp;
          console.log('before if get', resp);
        this.getUnitDetailsById(this.timeline.timelineVisitId.visitUnitId.unitId);
        // if (this.timeline.timelineEMRFinalStaffId.staffSignName === '' || this.timeline.timelineEMRFinalStaffId.staffSignName === null) {
        //   // this.timeline.timelineEMRFinalStaffId.staffSignName = null;
        // }
        // if (this.linkSource === 'ipd') {
        //   // this.getVisit();
        // }
        // else {
          this.currentPatient = this.timeline.timelineVisitId.visitPatientId;
          this.currentPatientId = this.timeline.timelineVisitId.visitPatientId.patientId;
          this.currentVisit = this.timeline.timelineVisitId;
          //   this.getUnitDetailsById(this.unitid);
          this.getVisitAllergies(this.currentPatientId);
        // }
          console.log('above get', this.timeline);
        this.getHistory();
        this.getChiefCompaints();
        this.getSymptoms();
        this.getNonDrugAllergies();
        this.getVitals();
        this.getDiagonasis();
        this.getInvestigation();
        this.getPrespription();
        this.getClinicalProcedure();
        // this.getOtRequestList();
        // this.getClinicalFinding();
        // this.getDoctorsNote();
        this.getEmrReferringLetters();
      });
  }
  getUnitDetailsById(id: any) {
    this.myConsultationviewService.getUnitById(id)
      .subscribe(resp => {
        this.mstUnit = resp;
        // console.log('unit details');
        // console.log(resp);
      });
  }

  getInvestigation() {
    this.myConsultationviewService.getInvestigationByTimelineId('', '', this.timelineId, '', '').subscribe(resp => {
      if (resp['_body'] !== '') {
        this.investigationService = resp.content;
        //  // console.log(this.investigationService);
      }
    });
  }

  getPrespription() {
    this.myConsultationviewService.getPrescriptionByTimelineId(this.timelineId)
      .subscribe(resp => {

        //  // console.log(resp);
        this.currentPrescription = resp;
        this.filteredPrescription = resp;
      });
  }

  getDiagonasis() {
    this.myConsultationviewService.getDiagnosisByTimelineId('', '', this.timelineId, '', '')
      .subscribe(resp => {
        if (resp['_body'] !== '') {
          this.diagonasisArray = resp.content;
        }
      });
  }

  getVitals() {
    this.myConsultationviewService.getVitalsByTimelineId(1, 50, this.timelineId, '', '')
      .subscribe(resp => {
        if (resp.content !== '') {
          this.temrVitalList = resp.content;
        }
        // console.log('Vital Details:');
        // console.log(this.temrVitalList);
      });
  }

  navigateBack(){
    this.navCtrl.back();
  }

  getClinicalProcedure() {
    this.myConsultationviewService.getClinicalRecordByTimelineId('', '', this.timelineId, '', '').subscribe(respClinicalProcedure => {
      this.clinicalProcedureList = respClinicalProcedure.content;
      console.log("Clinical procedure : ", this.clinicalProcedureList);
    });
  }

  getEmrReferringLetters() {
    console.log('current Visit', this.currentVisit);
    this.myConsultationviewService.getReferalLatterrdbyVisitId(this.currentVisit.visitId).subscribe(resp => {
      this.referalLatterList = resp;
    });
  }

  getHistory() {
    this.myConsultationviewService.getHistoryByPatientId(this.timeline.timelinePatientId.patientId).subscribe(resp => {
      if (resp.vhContent != '') {
        this.temrVisitHistory = resp;
        console.log('history',)
      }
    });
  }

  getChiefCompaints() {
    this.myConsultationviewService.getChiefComplaintBytimelineId(this.timelineId).subscribe(resp => {
      this.chipComplaintes = resp;
      console.log("chief complaints==>",this.chipComplaintes);
    });
  }

  getSymptoms() {
    this.myConsultationviewService.getSymtomsByTimelineId(this.timelineId).subscribe(resp => {
      this.chipSymptoms = resp;
      console.log('chipSymptoms::', this.chipSymptoms);
      if (resp.vsSymptomId == null || resp.vsSymptomId == undefined || resp.vsSymptomId == '') {
        this.sympname = true;
        this.symptomName = resp.vsSignSymptoms;
        console.log('symtons name::', this.symptomName);
      }
      // console.log(resp);
    });
  }

  getNonDrugAllergies() {
    this.myConsultationviewService.getNonDrgAlgByTmeineId(this.timelineId).subscribe(resp => {
      console.log("Allergies 1 : ", resp);
      this.chipAllergies = resp;
      // for (const obj of resp) {
      //   this.tempobj = obj.vndaNdaId;
      //   this.chipAllergies.push(this.tempobj);
      //   console.log("Allergies 2 : ", this.chipAllergies);
      // }
    });
  }

  getVisitAllergies(patientId: any) {
    this.myConsultationviewService.getAllergyByTimelineId('1', '', patientId, '', '').subscribe(
      resp => {
        this.allergyList = resp.content;
        if (resp['_length'] > 0) {
        }
      });
  }

  ngOnInit(): void {


    console.log('timelineID', this.timelineId);
    this.route.queryParams.subscribe(params => {
      this.timelineId = params['timelineId'];
      // Now you can use this.timelineId in your component.
      this.getTimelineDetails();
    });
  }

  downloadPdf() {

  }
}
