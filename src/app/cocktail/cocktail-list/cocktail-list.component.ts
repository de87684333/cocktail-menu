import { Component, OnInit } from '@angular/core';
import { CocktailService } from '../services/cocktail.service';
import { CommonModule } from '@angular/common';
import { CocktailCardComponent } from '../cocktail-card/cocktail-card.component';

@Component({
  selector: 'app-cocktail-list',
  standalone: true,
  imports: [CommonModule, CocktailCardComponent],
  templateUrl: './cocktail-list.component.html',
  styleUrl: './cocktail-list.component.scss'
})
export class CocktailListComponent implements OnInit {

  filteredCocktails = this.cocktailService.filteredCocktails;
  favoriteCocktails = this.cocktailService.favoriteCocktails;

  constructor(private cocktailService: CocktailService) {
  }

  ngOnInit(): void {
    this.cocktailService.retrieveCocktails();
  }

  onFilter(event: Event) {
    const searchName = (event.target as HTMLInputElement).value;
    this.cocktailService.filterCocktails(searchName);
  }

  isCocktailFavorite(id: string) {
    return this.favoriteCocktails().includes(id);
  }

  updateFavoriteCocktails(cocktailId: string, isFavorite: boolean) {
    if(isFavorite) {
      this.cocktailService.addFavoriteCocktail(cocktailId);
    } else {
      this.cocktailService.removeFavoriteCocktail(cocktailId);
    }
  }

}
