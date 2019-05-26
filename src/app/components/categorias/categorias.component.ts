import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoriasService } from '../../services/categorias.service';
import { CategoriaInterface } from '../../models/categoria';
import { CategoriaModalComponent } from '../../modals/categoria-modal/categoria-modal.component';

import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../models/user';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  constructor(
    private categoriaService: CategoriasService, 
    public dialog: MatDialog,
    private authService: AuthService
    ) { }

  public isAdmin: any = null;
  public userUid: string = null;
  displayedColumns: string[] = ['type','name', 'actions'];
  dataSource = new MatTableDataSource();

  openDialog(): void {
    const dialogRef = this.dialog.open(CategoriaModalComponent, {
      width: '250px',
      data: {selectedCategoria: this.categoriaService.selectedCategoria,
             userUid: this.userUid}

    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.getCurrentUser();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  getAllCategoriasByUser(userUid: string){
    this.categoriaService.getCategoriasByUser(userUid).subscribe(res => {
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
    const confirmacion = confirm('Estás seguro?');
    if(confirmacion){
      this.categoriaService.deleteCategoria(idCategoria);
    }
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if(auth){
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        })
        this.getAllCategoriasByUser(this.userUid);
      }
    })
  }
}
