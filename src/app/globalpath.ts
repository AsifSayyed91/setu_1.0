import {ToastController} from "@ionic/angular";
import {Injectable} from "@angular/core";
import * as https from "https";

// @Injectable()
@Injectable({
  providedIn: 'root', // You can also provide the service at the root level.
})

export class Global {
  //paientImgPath = "http://localhost:8080/patientfile/";


  /*Local Services*/

  // paientImgPath = "http://localhost:9004/patientimage/";
  // globallink = 'http://localhost:9004/';
  // serviceIconimage = 'https://cellbeans.in:8443/icon/';
  // vc_globallink = 'https://cellbeans.in:8443/kendi/index1.html';
  // paymentLink = 'https://cellbeans.in:8443/pay/pay';

  filter =false;

  // globallink = 'http://20.74.246.103:8080/mulk_live_ws/';
  // paientImgPath = 'http://20.74.246.103:8080/mulk_patientimage/';
  // docpath = 'http://20.74.246.103:8080/mulk_patientfile/';
  // serviceIconimage = 'http://20.74.246.103:8080/icon/';
  // paymentLink = 'http://20.74.246.103:8080/ccavenue/pay';
  // // vc_globallink = 'https://cellbeans.in/MULK';
  // // vc_globallink = 'https://vc.mulkmed.com/MULK';
  // //vc_globallink = 'https://cellbeans.in/';
  // vc_globallink =  'https://meet.jit.si/';
  /*Local */
  // globallink = '/png_beta_ws/';
  // globallink = 'http://localhost:9004/';
  // serviceIconimage = 'http://localhost:8080/icon/';
  // paientImgPath = 'http://localhost:8080/png_patientimage/';
  // vc_globallink = 'https://meet.jit.si/';
  // docpath = 'http://localhost:8080/mulk_patientfile/';
  // paymentLink = 'http://localhost:8080/CCAvenue/pay';
  //
//mobile app path//
  globallink = 'https://pt.mulkmed.com/mulk_beta_ws/';
  paientImgPath = "https://pt.mulkmed.com/mulk_patientimage/";
  serviceIconimage = 'https://pt.mulkmed.com/icon/';
  vc_globallink = 'https://vc.mulkmed.com/MULK';
  docpath = 'https://pt.mulkmed.com/mulk_patientfile/';
  paymentLink = 'https://pt.mulkmed.com/CCAvenue/pay';






  // For Mulk Server
  // globallink = 'https://mulktelemed.com:8443/mulk_test_ws/';
  // paientImgPath = 'https://mulktelemed.com:8443/mulk_patientimage/';
  // docpath = 'https://mulktelemed.com:8443/mulk_patientfile/';
  // serviceIconimage = 'https://mulktelemed.com:8443/icon/';
  // paymentLink = 'https://mulktelemed.com:8443/ccavenue/pay';
  // // vc_globallink = 'https://cellbeans.in/MULK';
  // vc_globallink = 'https://vc.mulkmed.com/MULK';


  // vc_globallink = 'https://mulktelemed.com/kendi/index1.html';


  /*for CB Server*/
  /* globallink = 'https://cellbeans.in:8443/mobile_test_ws/';
   paientImgPath = "https://cellbeans.in:8443/mulk_patientimage/";
   vc_globallink = 'https://cellbeans.in:8443/kendi/index1.html';
   docpath = 'https://cellbeans.in:8443/mulk_patientfile/';
   serviceIconimage = 'https://cellbeans.in:8443/icon/';
   paymentLink = 'https://cellbeans.in:8443/pay/pay';
*/


  // vc_globallink = 'https://cellbeans.in:8443/kendi/index1.html';
  // vc_globallink = 'https://mulktelemed.com/kendi/index1.html';

  // vc_globallink = 'https://mulktelemed.com/kendi/index1.html';
  // paymentLink = 'https://mulktelemed.com/pay/pay';
  VCSUFFIX = 'MULK';
  payment = true;
  Maldives = false;
  Healthspring = false;
  footer = false;
  mobileCode = '971';
  mobileLength = 9;
  mobileLengthIndia = '';

  constructor(public toastCtrl: ToastController) {
  }

  async showToast(msg: string, duration: number, position: string) {
    this.showToaster(msg,duration,position,"successToast");

  }

  async showToasts(msg: string, duration: number, position: string) {
    this.showToaster(msg,duration,position,"normalToasts");
  }

  async showToastwaring(msg: string, duration: number, position: string) {
    this.showToaster(msg,duration,position,"wartoast");
  }

  async showToasterror(msg: string, duration: number, position: string) {
    this.showToaster(msg,duration,position,"dangererr");
  }

  async NetworkAlert(msg: string, duration: number, position: string) {
    this.showToaster(msg,duration,position,"dangererr");

  }


  async showToaster(msg: string, duration: number, position: string, css: string) {
      const toast = await this.toastCtrl.create({
        header: 'Welcome!',
        message: msg,
        duration: 1500,
        position: "top",
        cssClass: css,
        buttons: [
          {
            side: 'end',
            icon: 'person',
            handler: () => {
              console.log('');
            }
          }, {
            side: 'end',
            text: 'Close',
            role: 'cancel',
            handler: () => {
              console.log('');
            }
          }
        ]
      });
      await toast.present();
  }
}
