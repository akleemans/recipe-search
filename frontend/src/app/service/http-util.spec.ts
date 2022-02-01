import {HttpErrorResponse} from '@angular/common/http';
import {HttpUtil} from './http-util';

describe('HttpUtil', () => {
  let service: HttpUtil;

  beforeEach(() => {
    service = new HttpUtil();
  });

  it('should create an instance', () => {
    expect(service).toBeDefined();
  });

  describe('getErrorMessage', () => {
    it('should get server message', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: HttpErrorResponse = {error: {message: 'Error!'}} as any;
      expect(HttpUtil.getErrorMessage(response)).toBe('Error!');
    });

    it('should get response message if no server message', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: HttpErrorResponse = {message: 'ResponseError!'} as any;
      expect(HttpUtil.getErrorMessage(response)).toBe('ResponseError!');
    });
  });
});
