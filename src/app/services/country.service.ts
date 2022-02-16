import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() { }

  getCountries():string[]{
    return ["Cameroon", "Ethiopia", "Morocco", "Mozambique", "Uganda"];
  }
}
