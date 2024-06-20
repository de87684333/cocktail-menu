import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CocktailListComponent } from './cocktail-list.component';
import { CocktailService } from '../services/cocktail.service';

describe('CocktailListComponent', () => {
  let component: CocktailListComponent;
  let fixture: ComponentFixture<CocktailListComponent>;
  let service: CocktailService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailListComponent, HttpClientTestingModule]
    })
    .compileComponents();

    service = TestBed.inject(CocktailService);
    fixture = TestBed.createComponent(CocktailListComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should define if a cocktail is favorite', () => {
    const cocktailId = '1';
    component.favoriteCocktails.set(['1', '2']);

    const expected = component.isCocktailFavorite(cocktailId);

    expect(expected).toBeTrue();
  });

  it('should define if a cocktail is not favorite', () => {
    const cocktailId = '3';
    component.favoriteCocktails.set(['1', '2']);

    const expected = component.isCocktailFavorite(cocktailId);

    expect(expected).toBeFalse();
  });

  it('should add a cocktail to favorites', () => {
    const cocktailId = '3';
    component.favoriteCocktails.set(['1', '2']);

    component.updateFavoriteCocktails(cocktailId, true);

    expect(component.favoriteCocktails().length).toBe(3);
  });

  it('should remove a cocktail from favorites', () => {
    const cocktailId = '2';
    component.favoriteCocktails.set(['1', '2']);

    component.updateFavoriteCocktails(cocktailId, false);

    expect(component.favoriteCocktails().length).toBe(1);
  });

  it('should update filter when a text is entered', () => {
    spyOn(service, 'filterCocktails');

    const searchCocktail = fixture.nativeElement.querySelector('#searchCocktail');
    searchCocktail.value = 'smut';
    searchCocktail.dispatchEvent(new Event('input'));

    expect(service.filterCocktails).toHaveBeenCalledWith('smut');
  });
});
