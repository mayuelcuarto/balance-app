import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { ConceptosComponent } from './components/conceptos/conceptos.component';
import { CategoriasComponent } from './components/categorias/categorias.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'conceptos', component: ConceptosComponent },
	{ path: 'categorias', component: CategoriasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
