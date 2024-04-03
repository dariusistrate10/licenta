import { Component, Input, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-addresses-list',
  templateUrl: './addresses-list.component.html',
  styleUrls: ['./addresses-list.component.css']
})
export class AddressesListComponent implements OnInit {

  @Input() addressesList!: any[];
  addresses: any[] = [];
  faHouse = faHouse;
  faLocation = faLocationArrow;

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.addressService.getAddresses().subscribe(data => {
      this.addresses = data;
      // console.log(this.addresses)
    })
  }
}