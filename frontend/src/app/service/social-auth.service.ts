import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class SocialAuthService {
  constructor(private auth: AuthService) {}
  // Method to subscribe to the user data observable
  getUserData() {
    this.auth.user$.subscribe((user: any) => {
      console.log('User data:', user);
    });
  }

  // Method to get the ID token (JWT)
  getIdToken() {
    this.auth.idTokenClaims$.subscribe((claims: any) => {
      console.log('ID Token:', claims?.__raw); // Full raw token (JWT)
    });
  }

  // Method to get the access token for API calls
  getAccessToken() {
    this.auth.getAccessTokenSilently().subscribe(
      (token: any) => {
        console.log('Access Token:', token);
      },
      (error: any) => {
        console.error('Error fetching access token', error);
      }
    );
  }

  // Method to handle login
  login() {
    this.auth.loginWithRedirect();
  }

  // Method to handle logout
  logout() {
    this.auth.logout({ returnTo: window.location.origin });
  }
}
