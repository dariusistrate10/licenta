import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {HomepageService} from "../../services/homepage.service";

  @Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.css']
  })
export class HomepageComponent implements OnInit {

  faStar = faStar;

  constructor(private homepageService: HomepageService) {}

  ngOnInit(): void {
  }

}
