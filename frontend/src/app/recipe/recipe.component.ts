import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe';
import {UiIngredient} from '../ui-ingredient';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  private sourcesMap: { [key: string]: string } = {
    'betty-bossi': 'Betty Bossi',
    'migusto': 'Migusto',
    'wildeisen': 'Wildeisen',
    'fooby': 'Fooby',
    'swissmilk': 'Swissmilk',
    'alnatura': 'Alnatura'
  };

  @Input()
  public recipe!: Recipe;

  @Input()
  public ingredients!: UiIngredient[];

  public availableIngredients: string = '';

  public ngOnInit(): void {
    this.availableIngredients = this.ingredients.map(i => i.name).filter(i =>
      this.recipe.ingredients.some(ri => ri.toLowerCase().includes(i.toLowerCase()))).join(', ');
  }

  public openRecipe(): void {
    window.open(this.recipe.url, "_blank");
  }

  public mapSource(source: string): string {
    return this.sourcesMap[source] ?? '';
  }
}
