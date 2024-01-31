import { Component, OnInit } from '@angular/core';
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-send-feedback',
  templateUrl: './send-feedback.page.html',
  styleUrls: ['./send-feedback.page.scss'],
})
export class SendFeedbackPage implements OnInit {
  feedback: string = '';
  rating: number;

  constructor(private toastController: ToastController) {}

  async submitFeedback() {
    // Here you can send feedback and rating to your backend or perform any action
    console.log('Feedback:', this.feedback);
    console.log('Rating:', this.rating);

    // Show a toast message to confirm feedback submission
    const toast = await this.toastController.create({
      message: 'Thank you for your feedback!',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  // constructor() { }

  ngOnInit() {
  }

}
