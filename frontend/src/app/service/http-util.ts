import {HttpErrorResponse} from '@angular/common/http';

export class HttpUtil {
  public static getErrorMessage(response: HttpErrorResponse): string {
    if (response.error && response.error.message) {
      return response.error.message;
    } else {
      return response.message;
    }
  }
}
