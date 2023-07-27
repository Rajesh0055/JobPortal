import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) {

   }

   getAllCountries():Observable<any>
   {
    debugger
     var url="https://demo.codingbirdsonline.com/country-state-city-dropdown-api/index.php?endpoint=getcountry";
     return this.http.get(url);
   }
   getStateByCountryId(countryId:any)
   {
     var url="https://demo.codingbirdsonline.com/country-state-city-dropdown-api/index.php?endpoint=getstate&country_id="+countryId;
     return this.http.get(url);
   }

   getCityByStateId(stateId:any)
   {
     var url="https://demo.codingbirdsonline.com/country-state-city-dropdown-api/index.php?endpoint=getcity&state_id="+stateId;
     
     return this.http.get(url);
   }
}
