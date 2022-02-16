import { Component, OnInit } from '@angular/core';
import { NzTableFilterList, NzTableQueryParams } from 'ng-zorro-antd/table';
import Customer from 'src/app/model/customer';
import { CountryService } from 'src/app/services/country.service';
import { CustomerService } from 'src/app/services/customer.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  searchValue = '';
  visible = false;
  isLoading: boolean = false;
  customers: Customer[] = [];
  filterValid: NzTableFilterList = ['true', 'false'].map((s) => {
    return { text: s, value: s };
  });

  filterCountryName: NzTableFilterList = [];
  filter: Array<{ key: string; value: string[] }> = [];

  constructor(
    private countryService: CountryService,
    private customerService: CustomerService
  ) {
    this.filterCountryName = this.countryService.getCountries().map((c) => {
      return { text: c, value: c };
    });
  }

  ngOnInit(): void {
    this.loadCustomers()
  }

  loadCustomers(country:string='', valid:string='') {
    this.isLoading = true;
    this.customerService
      .getCustomers(country, valid)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((customers) => (this.customers = customers));
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    const {filter } = params;
    this.filter = filter;
    let countryFilter = this.filter.filter((f) => {
      return f.key && f.key.indexOf('country_name') >= 0;
    })[0];
    let country: string="";
    if (countryFilter) {
      country = countryFilter.value as unknown as string;
    }
    let validFilter = this.filter.filter((f) => {
      return f.key && f.key.indexOf('is_valid') >= 0;
    })[0];
    let valid: string="";
    if (validFilter) {
      valid = validFilter.value as unknown as string;
    }
    this.loadCustomers(country,valid);
  }
}
