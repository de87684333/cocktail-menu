import { Component, EventEmitter, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AlcoholicTagComponent } from '../alcoholic-tag/alcoholic-tag.component';
import { Cocktail } from '../models/cocktail.model';

@Component({
  selector: 'app-cocktail-card',
  standalone: true,
  imports: [CommonModule, AlcoholicTagComponent],
  templateUrl: './cocktail-card.component.html',
  styleUrl: './cocktail-card.component.scss'
})
export class CocktailCardComponent {
  cocktail = input.required<Cocktail>();

  isFavorite = input(false);

  @Output()
  isFavoriteChange = new EventEmitter<boolean>();

  constructor(private router: Router) {
  }

  onFavoriteClick() {
    this.isFavoriteChange.emit(!this.isFavorite());
  }

  navigateToDetailsPage() {
    this.router.navigate(['/cocktails', this.cocktail().id]);
  }
}
