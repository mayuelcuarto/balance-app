import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriasService } from '../../services/categorias.service';
import { CategoriaInterface } from '../../models/categoria';
import { CategoriaModalComponent } from '../../modals/categoria-modal/categoria-modal.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(private categoriaService: CategoriasService, public dialog: MatDialog) { }
  displayedColumns: string[] = ['type','name', 'actions'];
  dataSource = new MatTableDataSource();

  openDialog(): void {
    const dialogRef = this.dialog.open(CategoriaModalComponent, {
      width: '250px',
      data: {selectedCategoria: this.categoriaService.selectedCategoria}
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
  	this.getAllCategorias();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  getAllCategorias(){
    this.categoriaService.getCategorias().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  onChangeStatus(categoria: CategoriaInterface){
    this.categoriaService.updateCategoria(categoria);
  }

  onPreUpdateConcepto(categoria: CategoriaInterface){
    this.categoriaService.selectedCategoria = Object.assign({}, categoria);
    this.openDialog();
  }

  onDeleteConcepto(idCategoria: string){
    const confirmacion = confirm('Are you sure?');
    if(confirmacion){
      this.categoriaService.deleteCategoria(idCategoria);
    }
  }

}
