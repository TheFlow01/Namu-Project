import { Component, OnInit, Input, Output } from '@angular/core';

interface TabLink {
  label: string;
  link: string;
  status: string;
}

@Component({
  selector: 'app-nav-tab',
  templateUrl: './nav-tab.component.html',
  styleUrls: ['./nav-tab.component.css']
})
export class NavTabComponent implements OnInit {
  @Input() tabLinks: TabLink[];
  @Input() tabStatus: string;

  constructor() { }

  ngOnInit() {
  }

}
