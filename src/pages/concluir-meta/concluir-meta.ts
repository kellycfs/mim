import { LottieAnimationViewModule } from 'ng-lottie';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ConcluirMetaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-concluir-meta',
  templateUrl: 'concluir-meta.html',
})
export class ConcluirMetaPage {

  lottieConfig:any;
  constructor(public navCtrl: NavController) {
    LottieAnimationViewModule.forRoot();
 
    this.lottieConfig = {
      path: 'assets/lotties/animation-w846-h379.json',
      autoplay: true,
      loop: false
    }
  }

}
