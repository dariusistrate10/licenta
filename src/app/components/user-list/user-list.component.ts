import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faHouse, faLocationArrow, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any[] = [];
  faHouse = faHouse;
  faLocation = faLocationArrow;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faSearch = faMagnifyingGlass;
  filteredString: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      console.log(this.users);
    })
  }
}
