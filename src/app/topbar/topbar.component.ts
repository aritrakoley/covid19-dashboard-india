import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  isNavbarCollapsed = true;

  @Input() sources;
  @Input() summary;
  @Input() helplines;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {

  }

}
