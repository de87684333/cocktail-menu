import { HttpClient } from '@angular/common/http';
import { computed, effect, Injectable, signal } from '@angular/core';
import { Cocktail } from '../models/cocktail.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailService {
  private readonly basedUrl = '/cockails'

  private _cocktails = signal<Cocktail[]>([]);
  cocktails = this._cocktails.asReadonly();
  filteredCocktails = computed(() => {
    if(this.searchCocktailName() === '') {
      return this.cocktails();
    } else {
      return this.cocktails().filter(cocktail => cocktail.name.toLowerCase().includes(this.searchCocktailName()));
    }
  });

  searchCocktailName = signal('');

  favoriteCocktails = signal<string[]>([]);

  selectedCocktail = signal<Cocktail | undefined>(undefined);

  constructor(private httpClient: HttpClient) {
    this.initFavoriteCocktails();

    effect(() => {
      localStorage.setItem('favoriteCocktails', JSON.stringify(this.favoriteCocktails()));
    });
  }

  private initFavoriteCocktails() {
    const favoriteCocktails = localStorage.getItem('favoriteCocktails');
    if(favoriteCocktails) {
      this.favoriteCocktails.set(JSON.parse(favoriteCocktails));
    }
  }

  retrieveCocktails() {
    this.httpClient.get<Cocktail[]>(this.basedUrl).subscribe((cocktails: Cocktail[]) => {
      return this._cocktails.set(cocktails);
    });
  }

  retrieveCocktail(cocktailId?: string | null) {
    if(cocktailId) {
      this.httpClient.get<Cocktail>(`${this.basedUrl}/${cocktailId}`).subscribe((cocktail: Cocktail) => {
        this.selectedCocktail.set(cocktail);
      });
    }
  }

  filterCocktails(searchName: string = '') {
    this.searchCocktailName.set(searchName.toLowerCase());
  }

  addFavoriteCocktail(cocktailId: string) {
    if(!this.favoriteCocktails().includes(cocktailId)) {
      this.favoriteCocktails.update(favorites => [...favorites, cocktailId]);
    }
  }

  removeFavoriteCocktail(cocktailId: string) {
    this.favoriteCocktails.update(favorites => favorites.filter(id => id !== cocktailId));
  }
}

