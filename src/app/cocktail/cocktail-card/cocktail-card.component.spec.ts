import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailCardComponent } from './cocktail-card.component';
import { test } from '../../../../test';
import { Router } from '@angular/router';

describe('CocktailCardComponent', () => {
  let component: CocktailCardComponent;
  let fixture: ComponentFixture<CocktailCardComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailCardComponent]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CocktailCardComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('cocktail', test[0]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit true when cocktail is not favorite', () => {
    fixture.componentRef.setInput('isFavorite', false);
    fixture.detectChanges();

    component.isFavoriteChange.subscribe((value) => {
      expect(value).toBeTrue();
    });

    component.onFavoriteClick();
  });

  it('should emit false when cocktail is favorite', () => {
    fixture.componentRef.setInput('isFavorite', true);
    fixture.detectChanges();

    component.isFavoriteChange.subscribe((value) => {
      expect(value).toBeFalse();
    });

    component.onFavoriteClick();
  });

  it('should navigate to details page', () => {
    const spy = spyOn(router, 'navigate');

    component.navigateToDetailsPage();

    expect(spy).toHaveBeenCalledWith(['/cocktails', test[0].id]);
  });
});
