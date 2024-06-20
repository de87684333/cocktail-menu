import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CocktailDetailsComponent } from './cocktail-details.component';
import { CocktailService } from '../services/cocktail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { test } from '../../../../test';
import { Cocktail } from '../models/cocktail.model';

describe('CocktailDetailsComponent', () => {
  let component: CocktailDetailsComponent;
  let fixture: ComponentFixture<CocktailDetailsComponent>;
  let service: CocktailService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocktailDetailsComponent, HttpClientTestingModule],
      providers: [
        {
        provide: ActivatedRoute,
        useValue: {
          params: {
            subscribe: (fn: (value: any) => void) => fn({ id: '1' })
          }
        }
      }]
    })
    .compileComponents();

    service = TestBed.inject(CocktailService);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(CocktailDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.selectedCocktail.set(test[0] as Cocktail);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set cocktail as favorite when it\'s not the case yet', () => {
    spyOn(component, 'isFavorite').and.returnValue(false);
    spyOn(service, 'addFavoriteCocktail');

    component.onFavoriteClick();

    expect(service.addFavoriteCocktail).toHaveBeenCalledWith(test[0].id)
  });

  it('should remove cocktail from favorites when it\'s already a favorite', () => {
    spyOn(component, 'isFavorite').and.returnValue(true);
    spyOn(service, 'removeFavoriteCocktail');

    component.onFavoriteClick();

    expect(service.removeFavoriteCocktail).toHaveBeenCalledWith(test[0].id)
  });

  it('should navigate back to cocktails page', () => {
    const spy = spyOn(router, 'navigate');

    component.back();

    expect(spy).toHaveBeenCalledWith(['/cocktails']);
  });


});
