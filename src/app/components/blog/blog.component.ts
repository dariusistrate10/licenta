import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../services/blog.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  protected articles: { image_url: string, link: string, title: string }[] = []

  constructor(private blogService: BlogService) {
  }

  ngOnInit() {
    this.blogService.getNews().subscribe(data => {
      this.articles = data
    })
  }
}
