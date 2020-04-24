import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  summary;
  helplines;
  states;
  data;
  sources;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((res) => {
      console.log(res);

      this.sources = res['sources'];
      this.helplines = res['helplines'];
      this.data = {
        states: res['states'],
        confirmed: res['confirmed'],
        deceased: res['deceased'],
        recovered: res['recovered']
      };
      this.summary = {
        total_confirmed: res['total_confirmed'],
        total_deceased: res['total_deceased'],
        total_recovered: res['total_recovered'],
        states_affected: res['states'].length
      };
    });
  }

}
