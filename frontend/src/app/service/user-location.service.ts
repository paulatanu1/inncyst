import { Injectable } from '@angular/core';
import { from, mergeMap, Observable } from 'rxjs';
import { LocationScriptService } from './location-script.service';

@Injectable({
  providedIn: 'root',
})
export class UserLocationService {
  constructor(private g_script: LocationScriptService) {}

  // Method to return a single observable that emits all location details
  getLocationDetails(apiKey: string): Observable<LocationDetails> {
    return from(this.g_script.loadGoogleMaps(apiKey)).pipe(
      mergeMap(() => from(this.getUserLocation())),
      mergeMap(({ lat, lng }) =>
        from(this.getCityAndState(lat, lng)).pipe(
          mergeMap((addressDetails) => {
            // Create and return an observable with the combined details
            return new Observable<LocationDetails>((observer) => {
              observer.next({ ...addressDetails, lat, lng });
              observer.complete();
            });
          })
        )
      )
    );
  }

  // Get the user's current position using the Geolocation API
  private getUserLocation(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
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
  private getCityAndState(
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
    country: string;
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
            let country = '';
            // Loop through the address components to find city and state
            addressComponents.forEach(
              (component: google.maps.GeocoderAddressComponent) => {
                // console.log(component, 'loc');
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
                if (component.types.includes('country')) {
                  country = component.long_name;
                }
              }
            );

            resolve({
              city,
              state,
              premise,
              subLocality,
              area,
              Dist,
              pinCode,
              country,
            });
          } else {
            reject('Geocoder failed: ' + status);
          }
        }
      );
    });
  }
}
