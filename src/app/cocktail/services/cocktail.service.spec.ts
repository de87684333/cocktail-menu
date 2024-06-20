import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CocktailService } from './cocktail.service';
import { HttpClient } from '@angular/common/http';
import { test } from '../../../../test';
import { of } from 'rxjs/internal/observable/of';
import { StorageService } from '../../core/services/storage.service';

describe('CocktailService', () => {
  let service: CocktailService;
  let httpClient: HttpClient
  const mockStorageService = jasmine.createSpyObj('StorageService', ['get', 'save']);


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[
        { provide: StorageService, useValue: mockStorageService }
      ]
    });
    service = TestBed.inject(CocktailService);
    httpClient = TestBed.inject(HttpClient);

  });

  beforeEach(() => {
    spyOn(httpClient, 'get')
      .withArgs('/cockails').and.returnValue(of(test))
      .withArgs('/cockails/1').and.returnValue(of(test[0]));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve cocktails and init cocktails signal', () => {
    service.retrieveCocktails();

    expect(service.cocktails().length).toEqual(test.length);
    expect(service.cocktails()).toEqual(test);
  });

  it('should retrieve cocktail and init selectedCocktail signal', () => {
    service.retrieveCocktail('1');

    expect(service.selectedCocktail()).toEqual(test[0]);
  });

  it('should filter cocktails', () => {
    service.retrieveCocktails();
    service.filterCocktails('smut');

    expect(service.filteredCocktails().length).toEqual(1);
    expect(service.filteredCocktails()).toEqual([test[0]]);
  });

  it('should add favorite cocktail', () => {
    service.addFavoriteCocktail('1');

    expect(service.favoriteCocktails()).toEqual(['1']);
  });

  it('should not add favorite cocktail if already added', () => {
    service.addFavoriteCocktail('1');
    service.addFavoriteCocktail('1');

    expect(service.favoriteCocktails()).toEqual(['1']);
  });

  it('should remove favorite cocktail', () => {
    service.addFavoriteCocktail('1');
    service.addFavoriteCocktail('2');

    service.removeFavoriteCocktail('1');

    expect(service.favoriteCocktails()).toEqual(['2']);
  });

});
