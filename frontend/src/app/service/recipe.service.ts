import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs';
import {Recipe} from '../recipe';
import {RestService} from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService extends RestService {
  public constructor(
//    protected readonly toastr: ToastrService,
private readonly httpClient: HttpClient,
  ) {
    super();
  }

  public getRecipes(ingredients: string[], searchMode: string): Promise<Recipe[]> {
    return this.httpClient.post<Recipe[]>(
      `${this.baseUrl()}/recipes`, {ingredients, searchMode}).pipe(
      catchError(this.handleError)
    ).toPromise();
  }
}
