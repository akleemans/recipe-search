import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {
  private static restUrl: string = '';

  public static initialize(): void {
    const dev = EnvService.isDevelopment();
    console.log('Running in development mode:', dev);
    this.restUrl = location.origin + '/api';
    if (dev) {
      this.restUrl = 'http://localhost:5000/api';
    }
  }

  public static getRestUrl(): string {
    return this.restUrl;
  }

  private static isDevelopment = (): boolean => location.host.includes('localhost');
}

EnvService.initialize();
