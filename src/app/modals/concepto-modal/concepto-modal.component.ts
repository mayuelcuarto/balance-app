import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { ConceptoInterface } from '../../models/concepto';
import { TipoInterface } from '../../models/tipo';
import { CategoriaInterface } from '../../models/categoria';

import { ConceptosService } from '../../services/conceptos.service';
import { CategoriasService } from '../../services/categorias.service';

import { NgForm, FormControl } from '@angular/forms';

@Component({
  selector: 'app-concepto-modal',
  templateUrl: './concepto-modal.component.html',
  styleUrls: ['./concepto-modal.component.css']
})
export class ConceptoModalComponent implements OnInit {
  constructor(    
    public dialogRef: MatDialogRef<ConceptoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public conceptoService: ConceptosService,
    public categoriaService:  CategoriasService
    ) {}

  public tipos: TipoInterface[] = [
    {id: 'ingreso', name: 'Ingresos'},
    {id: 'egreso', name: 'Egresos'}
  ];

  public categorias: CategoriaInterface[] = [];
  fecha = null;

  onNoClick(conceptoForm: NgForm): void {
    conceptoForm.resetForm();
    this.dialogRef.close();
  }

  ngOnInit() {
    if(this.data.selectedConcepto.id != null){
      this.fecha = new FormControl(this.data.selectedConcepto.date.toDate());
      this.getCategoriasByTipo(this.data.selectedConcepto.type);
    }else{
      this.fecha = new FormControl(new Date());
      this.data.selectedConcepto.type = "ingreso";
      this.data.selectedConcepto.category = null;
      this.getCategoriasByTipo("ingreso");
    }
  }

  onSaveConcepto(conceptoForm: NgForm): void{
    if(this.data.selectedConcepto.id == null){
      // New
      console.log('New', conceptoForm.value);
      if(this.data.selectedConcepto.description != null 
        && this.data.selectedConcepto.mount != null
        && this.data.selectedConcepto.date != null){
        conceptoForm.value.date = this.fecha.value;
        this.conceptoService.createConcepto(conceptoForm.value);
      }
    }else{
      // Edit
      console.log('Update', conceptoForm.value);
      if(this.data.selectedConcepto.description != null 
        && this.data.selectedConcepto.mount != null
        && this.data.selectedConcepto.date != null){
        conceptoForm.value.date = this.fecha.value;
        this.conceptoService.updateConcepto(conceptoForm.value);
      }
    }
    conceptoForm.resetForm();
    this.dialogRef.close();
  }

  getAllCategorias(): void{
    this.categoriaService.getCategorias().subscribe(res => {
      this.categorias = res;
    });
  }

  getCategoriasByTipo(tipo: string): void{
    this.categoriaService.getCategoriasByTipo(tipo).subscribe(res => {
      this.categorias = res;
    });
  }

}
