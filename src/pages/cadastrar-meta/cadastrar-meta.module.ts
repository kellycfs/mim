import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarMetaPage } from './cadastrar-meta';

@NgModule({
  declarations: [
    CadastrarMetaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarMetaPage),
  ],
})
export class CadastrarMetaPageModule {}
