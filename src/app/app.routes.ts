import { Routes } from '@angular/router';
import { CocktailListComponent } from './cocktail/cocktail-list/cocktail-list.component';
import { CocktailDetailsComponent } from './cocktail/cocktail-details/cocktail-details.component';

export const routes: Routes = [
  { path: 'cocktails', component: CocktailListComponent, title: 'Cocktails' },
  { path: 'cocktails/:id', component: CocktailDetailsComponent, title: 'Cocktails details' },
  { path: '', redirectTo: '/cocktails', pathMatch: 'full' }
];
