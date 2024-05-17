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
  protected deals: {image_url: string, name: string}[] = []

  constructor(private homepageService: HomepageService) {}

  ngOnInit(): void {
    this.homepageService.getDeals().subscribe(data => {
      this.deals = data
    })
  }

}
