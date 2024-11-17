import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import ls from 'localstorage-slim';
import { ISocialData } from '../share/login/auth-model/auth.model';
@Injectable({
  providedIn: 'root',
})
export class SocialAuthService {
  socialData = new BehaviorSubject<ISocialData | null>(null);
  loginGlobalData = new BehaviorSubject(Object);
  constructor(private auth: AuthService) {}

  // Method to subscribe to the user data observable
  // getUserData() {
  //   this.auth.user$.subscribe(
  //     (user: any) => {
  //       console.log('User data:', user);
  //       this.checkUserStatus(user); // Check user status without blocking
  //     },
  //     (error) => {
  //       console.error('Error fetching user data:', error);
  //     }
  //   );
  // }

  getUserData() {
    this.auth.user$.subscribe({
      next: (user) => {
        console.log(user, 'userr');
        this.checkUserStatus(user);
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      },
    });
  }

  // Method to check if the user is blocked
  private checkUserStatus(user: any) {
    if (user?.app_metadata?.isBlocked) {
      console.warn('Access denied: User is blocked.');
      alert('Access denied. Your account is blocked. Please contact support.');
      this.logout(); // Optionally log the user out
    }
  }

  // Method to get the ID token (JWT)
  getIdToken() {
    this.auth.idTokenClaims$.subscribe((claims: any) => {
      ls.set('authIDToken', claims?.__raw);
    });
  }

  // Method to get the access token for API calls
  getAccessToken() {
    this.auth
      .getAccessTokenSilently()
      .pipe(
        tap((token: any) => {}),
        catchError((error: any) => {
          // console.error('Error fetching access token', error);
          return of(null); // Handle the error gracefully
        })
      )
      .subscribe();
  }

  // Method to handle login
  // login() {
  //   this.auth.loginWithRedirect().catch((error) => {
  //     console.error('Login failed:', error);
  //   });
  // }

  // Method to handle logout
  logout() {
    localStorage.clear();
    this.auth.logout();
  }
}
