import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConceptosService } from '../../services/conceptos.service';
import { ConceptoInterface } from '../../models/concepto';
import { ConceptoModalComponent } from '../../modals/concepto-modal/concepto-modal.component';

@Component({
  selector: 'app-conceptos',
  templateUrl: './conceptos.component.html',
  styleUrls: ['./conceptos.component.css']
})
export class ConceptosComponent implements OnInit {

  constructor(private conceptoService: ConceptosService, public dialog: MatDialog) { }
  displayedColumns: string[] = ['type','category','description', 'mount', 'date', 'actions'];
  dataSource = new MatTableDataSource();

  openDialog(): void {
    const dialogRef = this.dialog.open(ConceptoModalComponent, {
      width: '250px',
      data: {selectedConcepto: this.conceptoService.selectedConcepto,
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
  	this.getAllConceptos();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
  }

  getAllConceptos(){
    this.conceptoService.getConceptos().subscribe(res => {
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
    const confirmacion = confirm('Are you sure?');
    if(confirmacion){
      this.conceptoService.deleteConcepto(idConcepto);
    }
  }

}
