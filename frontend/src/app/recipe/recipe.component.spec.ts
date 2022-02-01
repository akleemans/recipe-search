import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Recipe} from '../recipe';
import {RecipeComponent} from './recipe.component';

describe('RecipeComponent', () => {
  let component: RecipeComponent;
  let fixture: ComponentFixture<RecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        RecipeComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeComponent);
    component = fixture.componentInstance;
    component.ingredients = [];
    component.recipe = {
      name: 'Rezeptname',
      image: 'url',
      source: 'migusto'
    } as Recipe;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
