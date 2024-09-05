import { Injectable } from '@angular/core';
import { ScriptLoadingService } from './load-script/script-loading.service';

@Injectable({
  providedIn: 'root',
})
export class UserLocationService {
  constructor(private scriptLoader: ScriptLoadingService) {}

  loadGoogleMapsAndGetLocation(
    apiKey: string
  ): Promise<{ lat: number; lng: number }> {
    return this.scriptLoader
      .loadGoogleMaps(apiKey)
      .then(() => this.getUserLocation());
  }

  // Get the user's current position using the Geolocation API
  getUserLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position.coords.latitude, position.coords.longitude);
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            reject('Geolocation failed: ' + error.message);
          }
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }

  // Use the Google Maps Geocoding API to convert lat/lng into city and state
  getCityAndState(
    lat: number,
    lng: number
  ): Promise<{
    city: string;
    state: string;
    premise: string;
    subLocality: string;
    area: string;
    Dist: string;
    pinCode: string;
  }> {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      const latlng = { lat, lng };

      geocoder.geocode(
        { location: latlng },
        (
          results: google.maps.GeocoderResult[] | null,
          status: google.maps.GeocoderStatus
        ) => {
          if (status === 'OK' && results && results.length > 0) {
            const addressComponents = results[0].address_components;

            let city = '';
            let state = '';
            let premise = '';
            let subLocality = '';
            let area = '';
            let Dist = '';
            let pinCode = '';
            // Loop through the address components to find city and state
            addressComponents.forEach(
              (component: google.maps.GeocoderAddressComponent) => {
                if (component.types.includes('locality')) {
                  city = component.long_name;
                }
                if (component.types.includes('administrative_area_level_1')) {
                  state = component.long_name;
                }
                if (component.types.includes('premise')) {
                  premise = component.long_name;
                }
                if (component.types.includes('sublocality_level_2')) {
                  subLocality = component.long_name;
                }
                if (component.types.includes('sublocality_level_1')) {
                  area = component.long_name;
                }
                if (component.types.includes('administrative_area_level_3')) {
                  Dist = component.long_name;
                }
                if (component.types.includes('postal_code')) {
                  pinCode = component.long_name;
                }
              }
            );

            resolve({ city, state, premise, subLocality, area, Dist, pinCode });
          } else {
            reject('Geocoder failed: ' + status);
          }
        }
      );
    });
  }
}
