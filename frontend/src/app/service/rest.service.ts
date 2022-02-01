import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {EnvService} from './env.service';
import {HttpUtil} from './http-util';

export class RestService {
  public constructor(
  ) {
  }

  /*
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public options(): { headers: any; params?: any } {
    return this.authService.getOptions();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public publicOptions(): { headers: any; params?: any } {
    return this.authService.getPublicHeaders();
  }*/

  public baseUrl(): string {
    return EnvService.getRestUrl();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public handleError = (response: HttpErrorResponse): Observable<void | any> => {
    console.error('RestService / Handling HttpErrorResponse:', response);
    // try to show message from server, if available
    const serverMessage = HttpUtil.getErrorMessage(response);
    return throwError(response);
  };
}
