import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-entregas-ent',
  templateUrl: './entregas-ent.page.html',
  styleUrls: ['./entregas-ent.page.scss'],
})
export class EntregasEntPage implements OnInit {

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
