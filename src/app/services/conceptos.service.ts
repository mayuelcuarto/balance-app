import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConceptoInterface } from '../models/concepto';

@Injectable({
  providedIn: 'root'
})
export class ConceptosService {

  constructor(private readonly afs: AngularFirestore) {}
  private conceptosCollection: AngularFirestoreCollection<ConceptoInterface>;
  private conceptos: Observable<ConceptoInterface[]>;
  private conceptoDoc: AngularFirestoreDocument<ConceptoInterface>;
  private concepto: Observable<ConceptoInterface>;
  public selectedConcepto: ConceptoInterface = {
    id: null
  };

  getConceptos(){
    this.conceptosCollection = this.afs.collection<ConceptoInterface>('conceptos');
    return this.conceptos = this.conceptosCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as ConceptoInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  getConceptosByUser(userUid: string){
    this.conceptosCollection = this.afs.collection('conceptos', ref => ref.where('userUid', '==', userUid));
    return this.conceptos = this.conceptosCollection.snapshotChanges()
    .pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as ConceptoInterface;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  updateConcepto(concepto: ConceptoInterface){
  	return this.conceptosCollection.doc(concepto.id).update(concepto);
  }

  deleteConcepto(id: string){
  	return this.conceptosCollection.doc(id).delete();
  }

  createConcepto(concepto: ConceptoInterface){
  	return this.conceptosCollection.add(concepto);
  }
}
