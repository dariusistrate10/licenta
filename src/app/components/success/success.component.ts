import { Component, OnInit } from '@angular/core';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  number: any = Math.random()*100000000;
  orderNumber = Math;
  faCheck = faCheckCircle;

  constructor() {}

  ngOnInit(): void {
  }

}
