import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {SendFeedbackPageModule} from "./send-feedback/send-feedback.module";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full'
  },
  {
    path: 'account-register',
    loadChildren: () => import('./account-register/account-register.module').then( m => m.AccountRegisterPageModule)
  },

  {
    path: 'contact-details',
    loadChildren: () => import('./contact-details/contact-details.module').then( m => m.ContactDetailsPageModule)
  },

  {
    path: 'send-feedback',
    loadChildren: () => import('./send-feedback/send-feedback.module').then( m => m.SendFeedbackPageModule)
  },

  {
    path: 'account-register-new',
    loadChildren: () => import('./account-register-new/account-register-new.module').then( m => m.AccountRegisterNewPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'aesthetics',
    loadChildren: () => import('./aesthetics/aesthetics.module').then( m => m.AestheticsPageModule)
  },
  {
    path: 'appointmentlist',
    loadChildren: () => import('./appointmentlist/appointmentlist.module').then( m => m.AppointmentlistPageModule)
  },
  {
    path: 'book-appointment-filter',
    loadChildren: () => import('./book-appointment-filter/book-appointment-filter.module').then( m => m.BookAppointmentFilterPageModule)
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./changepassword/changepassword.module').then( m => m.ChangepasswordPageModule)
  },
  {
    path: 'chronic-patient-management',
    loadChildren: () => import('./chronic-patient-management/chronic-patient-management.module').then( m => m.ChronicPatientManagementPageModule)
  },
  {
    path: 'chronic-patient-management-view',
    loadChildren: () => import('./chronic-patient-management-view/chronic-patient-management-view.module').then( m => m.ChronicPatientManagementViewPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'diagnostics',
    loadChildren: () => import('./diagnostics/diagnostics.module').then( m => m.DiagnosticsPageModule)
  },
  {
    path: 'diagnostics-labs',
    loadChildren: () => import('./diagnostics-labs/diagnostics-labs.module').then( m => m.DiagnosticsLabsPageModule)
  },
  {
    path: 'employee-view',
    loadChildren: () => import('./employee-view/employee-view.module').then( m => m.EmployeeViewPageModule)
  },
  {
    path: 'explore-services',
    loadChildren: () => import('./explore-services/explore-services.module').then( m => m.ExploreServicesPageModule)
  },
  {
    path: 'explorewise-partners',
    loadChildren: () => import('./explorewise-partners/explorewise-partners.module').then( m => m.ExplorewisePartnersPageModule)
  },
  {
    path: 'fileuploadforefferal',
    loadChildren: () => import('./fileuploadforefferal/fileuploadforefferal.module').then( m => m.FileuploadforefferalPageModule)
  },
  {
    path: 'fileuploadformylabreports',
    loadChildren: () => import('./fileuploadformylabreports/fileuploadformylabreports.module').then( m => m.FileuploadformylabreportsPageModule)
  },
  {
    path: 'fileuploadformyradiology',
    loadChildren: () => import('./fileuploadformyradiology/fileuploadformyradiology.module').then( m => m.FileuploadformyradiologyPageModule)
  },
  {
    path: 'fileuploadforsickleaves',
    loadChildren: () => import('./fileuploadforsickleaves/fileuploadforsickleaves.module').then( m => m.FileuploadforsickleavesPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'forgot-username',
    loadChildren: () => import('./forgot-username/forgot-username.module').then( m => m.ForgotUsernamePageModule)
  },
  {
    path: 'home-health',
    loadChildren: () => import('./home-health/home-health.module').then( m => m.HomeHealthPageModule)
  },
  {
    path: 'home-service-view',
    loadChildren: () => import('./home-service-view/home-service-view.module').then( m => m.HomeServiceViewPageModule)
  },
  {
    path: 'hospital',
    loadChildren: () => import('./hospital/hospital.module').then( m => m.HospitalPageModule)
  },
  {
    path: 'inquiry',
    loadChildren: () => import('./inquiry/inquiry.module').then( m => m.InquiryPageModule)
  },

  {
    path: 'insurance',
    loadChildren: () => import('./insurance/insurance.module').then( m => m.InsurancePageModule)
  },
  {
    path: 'labs',
    loadChildren: () => import('./labs/labs.module').then( m => m.LabsPageModule)
  },
  {
    path: 'medical-tourism',
    loadChildren: () => import('./medical-tourism/medical-tourism.module').then( m => m.MedicalTourismPageModule)
  },
  {
    path: 'medical-tourism-view',
    loadChildren: () => import('./medical-tourism-view/medical-tourism-view.module').then( m => m.MedicalTourismViewPageModule)
  },
  {
    path: 'medicine-delivery',
    loadChildren: () => import('./medicine-delivery/medicine-delivery.module').then( m => m.MedicineDeliveryPageModule)
  },
  {
    path: 'medicine-delivery-view',
    loadChildren: () => import('./medicine-delivery-view/medicine-delivery-view.module').then( m => m.MedicineDeliveryViewPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'modalpopup',
    loadChildren: () => import('./modalpopup/modalpopup.module').then( m => m.ModalpopupPageModule)
  },
  {
    path: 'my-complaints',
    loadChildren: () => import('./my-complaints/my-complaints.module').then( m => m.MyComplaintsPageModule)
  },
  {
    path: 'my-complaints-view',
    loadChildren: () => import('./my-complaints-view/my-complaints-view.module').then( m => m.MyComplaintsViewPageModule)
  },
  {
    path: 'my-consultation',
    loadChildren: () => import('./my-consultation/my-consultation.module').then( m => m.MyConsultationPageModule)
  },
  {
    path: 'my-consultationview',
    loadChildren: () => import('./my-consultationview/my-consultationview.module').then( m => m.MyConsultationviewPageModule)
  },
  {
    path: 'inquiries',
    loadChildren: () => import('./inquiries/inquiries.module').then( m => m.InquiriesPageModule)
  },
  {
    path: 'my-doctors',
    loadChildren: () => import('./my-doctors/my-doctors.module').then( m => m.MyDoctorsPageModule)
  },
  {
    path: 'my-labreports',
    loadChildren: () => import('./my-labreports/my-labreports.module').then( m => m.MyLabreportsPageModule)
  },
  {
    path: 'my-labreportsview',
    loadChildren: () => import('./my-labreportsview/my-labreportsview.module').then( m => m.MyLabreportsviewPageModule)
  },
  {
    path: 'my-prescription',
    loadChildren: () => import('./my-prescription/my-prescription.module').then( m => m.MyPrescriptionPageModule)
  },
  {
    path: 'my-prescriptionview',
    loadChildren: () => import('./my-prescriptionview/my-prescriptionview.module').then( m => m.MyPrescriptionviewPageModule)
  },
  {
    path: 'my-radiology',
    loadChildren: () => import('./my-radiology/my-radiology.module').then( m => m.MyRadiologyPageModule)
  },
  {
    path: 'my-radiologyview',
    loadChildren: () => import('./my-radiologyview/my-radiologyview.module').then( m => m.MyRadiologyviewPageModule)
  },
  {
    path: 'my-refferals',
    loadChildren: () => import('./my-refferals/my-refferals.module').then( m => m.MyRefferalsPageModule)
  },
  {
    path: 'my-refferalsview',
    loadChildren: () => import('./my-refferalsview/my-refferalsview.module').then( m => m.MyRefferalsviewPageModule)
  },
  {
    path: 'my-sick-leaves',
    loadChildren: () => import('./my-sick-leaves/my-sick-leaves.module').then( m => m.MySickLeavesPageModule)
  },
  {
    path: 'my-upload',
    loadChildren: () => import('./my-upload/my-upload.module').then( m => m.MyUploadPageModule)
  },
  {
    path: 'my-uploadview',
    loadChildren: () => import('./my-uploadview/my-uploadview.module').then( m => m.MyUploadviewPageModule)
  },
  {
    path: 'mysickleavesview',
    loadChildren: () => import('./mysickleavesview/mysickleavesview.module').then( m => m.MysickleavesviewPageModule)
  },
  {
    path: 'new-book-appointment',
    loadChildren: () => import('./new-book-appointment/new-book-appointment.module').then( m => m.NewBookAppointmentPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'our-doctors',
    loadChildren: () => import('./our-doctors/our-doctors.module').then( m => m.OurDoctorsPageModule)
  },
  {
    path: 'our-employees',
    loadChildren: () => import('./our-employees/our-employees.module').then( m => m.OurEmployeesPageModule)
  },
  {
    path: 'our-hospitals',
    loadChildren: () => import('./our-hospitals/our-hospitals.module').then( m => m.OurHospitalsPageModule)
  },
  {
    path: 'partners',
    loadChildren: () => import('./partners/partners.module').then( m => m.PartnersPageModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./payments/payments.module').then( m => m.PaymentsPageModule)
  },
  {
    path: 'paymentview',
    loadChildren: () => import('./paymentview/paymentview.module').then( m => m.PaymentviewPageModule)
  },
  {
    path: 'physiotherapy',
    loadChildren: () => import('./physiotherapy/physiotherapy.module').then( m => m.PhysiotherapyPageModule)
  },
  {
    path: 'popover',
    loadChildren: () => import('./popover/popover.module').then( m => m.PopoverPageModule)
  },
  {
    path: 'previleges-card',
    loadChildren: () => import('./previleges-card/previleges-card.module').then( m => m.PrevilegesCardPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'rating',
    loadChildren: () => import('./rating/rating.module').then( m => m.RatingPageModule)
  },
  {
    path: 'remote-patient',
    loadChildren: () => import('./remote-patient/remote-patient.module').then( m => m.RemotePatientPageModule)
  },
  {
    path: 'specialities',
    loadChildren: () => import('./specialities/specialities.module').then( m => m.SpecialitiesPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./start/start.module').then( m => m.StartPageModule)
  },
  {
    path: 'symptoms',
    loadChildren: () => import('./symptoms/symptoms.module').then( m => m.SymptomsPageModule)
  },
  {
    path: 'symptoms-new',
    loadChildren: () => import('./symptoms-new/symptoms-new.module').then( m => m.SymptomsNewPageModule)
  },
  {
    path: 'up-photo-applist',
    loadChildren: () => import('./up-photo-applist/up-photo-applist.module').then( m => m.UpPhotoApplistPageModule)
  },
  {
    path: 'vitals',
    loadChildren: () => import('./vitals/vitals.module').then( m => m.VitalsPageModule)
  },
  {
    path: 'contact-details',
    loadChildren: () => import('./contact-details/contact-details.module').then( m => m.ContactDetailsPageModule)
  },
  {
    path: 'send-feedback',
    loadChildren: () => import('./send-feedback/send-feedback.module').then( m => m.SendFeedbackPageModule)
  },
  // s
  // {
  //   path: 'menu_page',
  //   loadChildren: () => import('./vitals/vitals.module').then( m => m.VitalsPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
