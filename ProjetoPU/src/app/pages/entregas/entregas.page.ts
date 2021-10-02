import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.page.html',
  styleUrls: ['./entregas.page.scss'],
})
export class EntregasPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event: any) {
    if (event.detail.value === "pendentes") {
      this.slides.slidePrev();
    } else {
      this.slides.slideNext();
    }
  }

}
