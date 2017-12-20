import { Component, OnInit } from '@angular/core';

import { FeedService } from './feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  // TODO: set url parameter by parent component
  // type = 'question' || 'answer' (default: question)
  type = 'answer';
  nextURL: string;
  results = [];

  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.feedService.getFirstPage(this.type).subscribe(
      res => {
        this.results = [...this.results, ...res.results];
        this.nextURL = res.next;
      },
        err => console.log(err)
    );
  }

  onScrollBottom() {
    if (this.nextURL) {
      this.feedService.fetchNextPage(this.nextURL).subscribe(
        res => {
          this.results = [...this.results, ...res.results];
          this.nextURL = res.next;
        },
        err => console.log(err)
      );
    }
  }

  typeChange() {
    this.type = 'questions' ? 'answers' : 'questions';
  }
}
