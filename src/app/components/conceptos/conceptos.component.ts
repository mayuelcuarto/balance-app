import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConceptosService } from '../../services/conceptos.service';
import { ConceptoInterface } from '../../models/concepto';
import { ConceptoModalComponent } from '../../modals/concepto-modal/concepto-modal.component';

import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../models/user';

@Component({
  selector: 'app-conceptos',
  templateUrl: './conceptos.component.html',
  styleUrls: ['./conceptos.component.css']
})
export class ConceptosComponent implements OnInit {

  constructor(
    private conceptoService: ConceptosService, 
    public dialog: MatDialog,
    private authService: AuthService
    ) { }

  public isAdmin: any = null;
  public userUid: string = null;
  displayedColumns: string[] = ['type','category','description', 'mount', 'date', 'actions'];
  dataSource = new MatTableDataSource();

  openDialog(): void {
    const dialogRef = this.dialog.open(ConceptoModalComponent, {
      width: '250px',
      data: {selectedConcepto: this.conceptoService.selectedConcepto,
             userUid: this.userUid
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
  	//this.getAllConceptos();
    this.getCurrentUser();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  getAllConceptos(){
    this.conceptoService.getConceptos().subscribe(res => {
       this.dataSource.data = res;
    });
  }

  getConceptosByUser(userUid: string){
    this.conceptoService.getConceptosByUser(userUid).subscribe(res => {
       this.dataSource.data = res;
    });
  }

  onChangeStatus(concepto: ConceptoInterface){
    this.conceptoService.updateConcepto(concepto);
  }

  onPreUpdateConcepto(concepto: ConceptoInterface){
    this.conceptoService.selectedConcepto = Object.assign({}, concepto);
    this.openDialog();
  }

  onDeleteConcepto(idConcepto: string){
    const confirmacion = confirm('Estás seguro?');
    if(confirmacion){
      this.conceptoService.deleteConcepto(idConcepto);
    }
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if(auth){
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        })
        this.getConceptosByUser(this.userUid);
      }
    })
  }
}
