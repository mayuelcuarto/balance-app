import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { CategoriaInterface } from '../../models/categoria';
import { TipoInterface } from '../../models/tipo';

import { CategoriasService } from '../../services/categorias.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categoria-modal',
  templateUrl: './categoria-modal.component.html',
  styleUrls: ['./categoria-modal.component.css']
})
export class CategoriaModalComponent implements OnInit {

  constructor(
  	public dialogRef: MatDialogRef<CategoriaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public categoriaService: CategoriasService
    ) { }

  public tipos: TipoInterface[] = [
    {id: 'ingreso', name: 'Ingresos'},
    {id: 'egreso', name: 'Egresos'}
  ];

  onNoClick(categoriaForm: NgForm): void {
    categoriaForm.resetForm();
    this.dialogRef.close();
  }

  ngOnInit() {
    if(this.data.selectedCategoria.id != null){
      
    }else{
      this.data.selectedCategoria.type = "ingreso";
    }
  }

  onSaveCategoria(categoriaForm: NgForm): void{
    if(this.data.selectedCategoria.id == null){
      // New
      //console.log('New', categoriaForm.value);
      if(this.data.selectedCategoria.name != null){
        categoriaForm.value.userUid = this.data.userUid;
        this.categoriaService.createCategoria(categoriaForm.value);
      }
    }else{
      // Edit
      //console.log('Update', categoriaForm.value);
      if(this.data.selectedCategoria.name != null){
        this.categoriaService.updateCategoria(categoriaForm.value);
      }
    }
    categoriaForm.resetForm();
    this.dialogRef.close();
  }

}
