import { Component, computed, OnInit } from '@angular/core';
import { CocktailService } from '../services/cocktail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlcoholicTagComponent } from '../alcoholic-tag/alcoholic-tag.component';

@Component({
  selector: 'app-cocktail-details',
  standalone: true,
  imports: [CommonModule, AlcoholicTagComponent],
  templateUrl: './cocktail-details.component.html',
  styleUrl: './cocktail-details.component.scss'
})
export class CocktailDetailsComponent implements OnInit {

  selectedCocktail = this.cocktailService.selectedCocktail;

  isFavorite = computed(() => {
    return this.cocktailService.favoriteCocktails().includes(this.selectedCocktail()?.id ?? '');
  });

  constructor(private route: ActivatedRoute, private cocktailService: CocktailService, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const cocktailId = params['id'];
      this.cocktailService.retrieveCocktail(cocktailId);
    });
  }

  back() {
    this.router.navigate(['/cocktails']);
  }

  onFavoriteClick() {
    const cocktailId = this.selectedCocktail()?.id;
    if(cocktailId && !this.isFavorite()) {
      this.cocktailService.addFavoriteCocktail(cocktailId);
    } else if(cocktailId) {
      this.cocktailService.removeFavoriteCocktail(cocktailId);
    }
  }


}
