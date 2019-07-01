import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../Customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  customers: Observable<Customer[]>;
 
  constructor(private customerService: CustomerService) { }
 
  ngOnInit() {
    this.reloadData();
  }
 
  deleteCustomers() {
    this.customerService.deleteAll()
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log('ERROR: ' + error));
  }
 
  reloadData() {
    this.customers = this.customerService.getCustomersList();
  }
}
