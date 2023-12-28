import { Injectable } from '@angular/core';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { BehaviorSubject, filter, Observable, pairwise } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LastUrlService {
  // private previousUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');
  // public previousUrl$: Observable<string> = this.previousUrl.asObservable();
  private previousUrl: string = '';
  private currentUrl: string = '';

  constructor(private router: Router) {
    // this.currentUrl = this.router.url;
    // router.events.subscribe(event => {
    //   // console.log(event ,'event',event instanceof NavigationEnd)
    //   if (event instanceof NavigationEnd) {
    //     this.previousUrl = this.currentUrl;
    //     this.currentUrl = event.url;

    //     console.log(this.previousUrl,'--',this.currentUrl)
    //   };
    // });

    this.router.events
      .pipe(
        filter((evt: any) => evt instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((events: RoutesRecognized[]) => {
        this.previousUrl = events[0].urlAfterRedirects;
      });
  }

  public getPreviousUrl() {
    return this.previousUrl;
  }
}
