import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {Recipe} from './recipe';
import {RecipeService} from './service/recipe.service';
import {UiIngredient} from './ui-ingredient';


enum SearchMode {
  standard = 'standard',
  use_most = 'use_most',
  have_most = 'have_most'
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public recipes: Recipe[] = [];
  public ingredients: UiIngredient[] = [
    {'name': 'Ricotta'},
    {'name': 'Spinat'},
    {'name': 'Parmesan'},
/*    {'name': 'Kohl'},
    {'name': 'Pastinake'},
    {'name': 'Spinat'},
    {'name': 'Schnittlauch'},
    {'name': 'Rande'},
    {'name': 'Zwiebel'},
    {'name': 'Karotte'},
    {'name': 'Kartoffel'},
    {'name': 'Chicorino'},

 */
  ];
  public searchMode: SearchMode = SearchMode.standard;
  public isLoading = false;

  public readonly searchModeEnum = SearchMode;
  public readonly separatorKeysCodes = [ENTER, COMMA] as const;

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.ingredients.push({name: value});
    }
    event.chipInput!.clear();
  }

  public remove(ingredient: UiIngredient): void {
    const index = this.ingredients.indexOf(ingredient);

    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
  }

  public constructor(
    private readonly recipeService: RecipeService,
  ) {
  }

  public async getRecipes(): Promise<void> {
    this.isLoading = true;
    this.recipes = await this.recipeService.getRecipes(this.ingredients.map(i => i.name), this.searchMode);
    this.isLoading = false;
  }
}
