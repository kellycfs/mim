import { Meta } from './../../models/meta';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable()
export class metaService {
  angularfire: AngularFireDatabase;

  private dbPath = '/metas';
  metasRef: AngularFireList<Meta> = null;

  items: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.metasRef = db.list(this.dbPath);
    this.items = this.metasRef.valueChanges();
  }


  private handleError(error) {
    console.log(error);
  }

  getAll() {
    // Buscando todos os itens no no "/meta"
    this.items = this.metasRef.valueChanges();
    return this.items;
  }

  getAllCompleted() {
    // Buscando todos os itens que estão completos
    this.items = this.angularfire.list('/metas', ref => ref.orderByChild('done').equalTo(true)).valueChanges();
    return this.items;
  }

  getAllOpened() {
    // Buscando todos os itens que estão em aberto
    this.items = this.angularfire.list('/metas', ref => ref.orderByChild('done').equalTo(false)).valueChanges();
    return this.items;
  }

  add(meta: Meta) {
    // Adicionando uma nova tarefa.
    // Toda nova tarefa é gravada como em aberto por padrão.
    // meta.done = false;

    // Adicionando o item na lista de itens.
    // Como essa lista é carregada antes, automaticamente o angularfire2
    // identifica a mudança na lista e inclui o item novo.
    this.metasRef.push(meta);
  }

  update(meta: Meta) {
    // Atualizando o item na lista.
    // Para isso passamos por parametro qual é o id do item no Firebase
    // e quais são os novos valores.
    this.metasRef.update(meta.$key, meta).catch(error => this.handleError(error));
  }

  save(meta: Meta) {
    // Metodo criado para facilitar a inclusão/alteração e um item.
    // Verifico se o item tem o Id para saber se é uma inclusão ou alteração.
    if (meta.$key == null) {
      this.add(meta);
    } else {
      this.update(meta);
    }
  }

  remove(meta: Meta) {
    // Removendo um item da lista
    this.metasRef.remove(meta.$key).catch(error => this.handleError(error));
  }

  toggleDone(meta: meta) {
    // Marcando uma tarefa como concluída ou em aberto.
    meta.done = !meta.done;
    this.update(meta);
  }

  removeAll(): void {
    this.metasRef.remove().catch(error => this.handleError(error));
  }

}
