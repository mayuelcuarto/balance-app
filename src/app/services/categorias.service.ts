import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriaInterface } from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private readonly afs: AngularFirestore) {}
  private categoriasCollection: AngularFirestoreCollection<CategoriaInterface>;
  private categorias: Observable<CategoriaInterface[]>;
  public selectedCategoria: CategoriaInterface = {
    id: null
  };

  getCategoriasByUser(userUid: string){
    this.categoriasCollection = this.afs.collection('categorias', ref => ref.where('userUid', '==', userUid));
    return this.categorias = this.categoriasCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as CategoriaInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  getCategoriasByTipoUser(tipo: string, userUid: string) {
    this.categoriasCollection = this.afs.collection('categorias', ref => ref.where('type', '==', tipo).where('userUid', '==', userUid));
    return this.categorias = this.categoriasCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as CategoriaInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  updateCategoria(categoria: CategoriaInterface){
  	return this.categoriasCollection.doc(categoria.id).update(categoria);
  }

  deleteCategoria(id: string){
  	return this.categoriasCollection.doc(id).delete();
  }

  createCategoria(categoria: CategoriaInterface){
  	return  this.categoriasCollection.add(categoria).
            then(docRef => {
              categoria.id = docRef.id;
              this.updateCategoria(categoria);
            });
  }
}
