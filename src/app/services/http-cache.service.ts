import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {
private request: any = {};
displayCachedData:boolean = false;
  constructor() { }
  put(url: string, user: string): void
  {
    this.request[url] = user;
  }
  get(url: string): string | undefined {
    return this.request[url];
  }
  invalidateUrl(url: string): void{
    this.request[url] = undefined;
  }
invalidateCache(): void{
    this.request = {};
}
}
