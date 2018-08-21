import { Meta } from './../../models/meta';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

// Importações necessárias
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth'


@Injectable()
export class MetasProvider {

  // Definição do caminho onde será salvo os dados
  // dos usuários
  private caminho: string = '';

  // Coleção de tarefas
  private metasCollection: AngularFirestoreCollection<Meta>;

  // Lista de tarefas
  metas: Observable<Meta>;

  // Parametros que vamos injetar no construtor
  constructor(private afs: AngularFirestore, private auth: AuthProvider) {
    
    // Verificando ser o usuário está logado para criarmos o caminho
    this.auth.user.subscribe(auth => {
      
      // Verifica se está logado e adiciona o caminho, usaremos o email
      // como caminho para ficar mais fácil identificar as tarefas de cada usuário
      if(auth != null)
      {
        this.caminho = '/' + auth.email;
        this.metasCollection = afs.collection<Meta>(this.caminho, ref => {
          return ref;
        });

      } else {
        this.caminho = '';
      }
    });
  }

  // Este método será retorna um lista de tarefas pode ser
  // as finalizadas ou as que ainda não foram finalizadas
  // para filtrar passamos o parametro finalizada
  list(finalizada: boolean) {
    return this.afs
      .collection<Meta>(this.caminho, ref => {
        return ref.where('finalizada', '==', finalizada);
      })
      .snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Meta;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      });
  }

  // Método usado para adicionar uma tarefa
  add(meta: Meta) {
    this.metasCollection.add(meta);
  }

  // Método usado para atualizar uma tarefa
  update(id: string, meta:Meta) {
    this.metasCollection.doc(id).update(meta);
  }

  // Método usado para excluir uma tarefa
  delete(id: string) {
    this.metasCollection.doc(id).delete();
  }

}
