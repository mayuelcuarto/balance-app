import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog, MatDialogRef, MatPaginator, MAT_DIALOG_DATA } from '@angular/material';

import { ConceptosService } from '../../services/conceptos.service';
import { ConceptoInterface } from '../../models/concepto';

import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../models/user';

import { NgForm, FormControl } from '@angular/forms';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  constructor(
    private conceptoService: ConceptosService, 
    public dialog: MatDialog,
    private authService: AuthService
    ) { }

  public isAdmin: any = null;
  public userUid: string = null;

  displayedColumns: string[] = ['type','category','description', 'mount', 'date'];
  dataSource = new MatTableDataSource();

  public fechaInicio = null;
  public fechaFin = null;

  public totalIngresos: string = null;
  public totalEgresos: string = null;
  public balance: string = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
    this.fechaInicio = new FormControl(new Date());
    this.fechaFin = new FormControl(new Date());
    this.getCurrentUser();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getConceptosByUserDates(filtroForm: NgForm){
    filtroForm.value.fechaInicio = this.fechaInicio.value;
    filtroForm.value.fechaFin = this.fechaFin.value;

    this.conceptoService.getConceptosByUserDates(this.userUid, filtroForm.value.fechaInicio, filtroForm.value.fechaFin).subscribe(res => {
      this.dataSource.data = res;

      let montoIngresos:number = 0.0;
      let montoEgresos:number = 0.0;

      res.forEach((element) => {
        if(element.type == 'ingreso'){
          montoIngresos = montoIngresos + parseFloat(element.mount.toString());
        }else if(element.type == 'egreso'){
          montoEgresos = montoEgresos + parseFloat(element.mount.toString());
        }
      });

      this.totalIngresos = montoIngresos.toFixed(2);
      this.totalEgresos = montoEgresos.toFixed(2);
      this.balance = (montoIngresos - montoEgresos).toFixed(2);
    });
  }

  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if(auth){
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        })
      }
    });
  }

}
