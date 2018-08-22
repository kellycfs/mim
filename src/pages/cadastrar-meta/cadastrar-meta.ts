import { TabsPage } from './../tabs/tabs';
import { Meta } from './../../models/meta';
import { Status } from './../../models/status';
import { MetasProvider } from './../../providers/metas/metas';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CadastrarMetaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastrar-meta',
  templateUrl: 'cadastrar-meta.html',
})
export class CadastrarMetaPage {

  // Definição do atributo tarefa que será usado para o cadastro
  public meta = {} as Meta;

  // Adicionando o serviço de tarefa no construtor
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private metasProvider:MetasProvider) {
  }

  // Método que será usado para adicionar uma tarefa
  adicionarMeta(meta: Meta) {
      meta.status = Status.ATIVA;
      this.metasProvider.add(meta);
      this.navCtrl.setRoot(TabsPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdicionarTarefaPage');
  }

}
