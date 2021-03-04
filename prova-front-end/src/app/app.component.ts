import { Component, OnInit } from '@angular/core';

import { AppService } from './service/parser.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public items: object;

  constructor(
    public parser: AppService
  ) {
    this.parser.changeTree$.subscribe((tree) => {
      this.items = tree;
    });
  }

  ngOnInit() {
    this.items = this.parser.tree;
  }
}
