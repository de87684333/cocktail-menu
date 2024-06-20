import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcoholicTagComponent } from './alcoholic-tag.component';

describe('AlcoholicTagComponent', () => {
  let component: AlcoholicTagComponent;
  let fixture: ComponentFixture<AlcoholicTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlcoholicTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlcoholicTagComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('isAlcoholic', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a tag with the text "Alcoholic" when isAlcoholic is true', () => {
    fixture.componentRef.setInput('isAlcoholic', true);
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');
    expect(span.textContent).toContain('Alcoholic');
  });

  it('should have a tag with the text "Non-alcoholic" when isAlcoholic is false', () => {
    fixture.componentRef.setInput('isAlcoholic', false);
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');
    expect(span.textContent).toContain('Non-alcoholic');
  });
});
