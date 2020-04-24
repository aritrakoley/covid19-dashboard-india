import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'plot-b',
  templateUrl: './plot-b.component.html',
  styleUrls: ['./plot-b.component.css']
})
export class PlotBComponent implements OnInit {

  @Input() data;

  graph;

  constructor() { }

  ngOnInit(): void {
    let states_br = this.data.states.map((label) => {
      return label.replace(/ /g,"<br>");
    });

    let confirmed = {
      name: 'Confirmed',
      type: 'bar',
      width: 0.6,
      x: this.data.confirmed,
      y: states_br,
     // text: this.data.confirmed,
      textposition: 'auto',
      orientation: 'h',
      transforms: [{
        type: 'sort',
        target: 'y',
        order: 'descending'
      }],
      marker: {
        color: 'rgba(0, 74, 140, 0.4)',
        line: { color: 'rgba(0, 74, 140, 1)', width: 2 }
      }
    };

    let recovered = {
      name: 'Recovered',
      type: 'bar',
      width: 0.7,
      x: this.data.recovered,
      y: states_br,
      orientation: 'h',
      transforms: [{
        type: 'sort',
        target: 'y',
        order: 'descending'
      }],
      marker: {
        color: 'rgba(0, 74, 140, 0.7)',
        line: { color: 'rgba(0, 74, 140, 1)', width: 2 }
      }
    };

    let deceased = {
      name: 'Deceased',
      type: 'bar',
      width: 0.8,
      x: this.data.deceased,
      y: states_br,
      orientation: 'h',
      transforms: [{
        type: 'sort',
        target: 'y',
        order: 'descending'
      }],
      marker: {
        color:  'rgba(0, 74, 140, 1)',
        line: { color: 'rgba(0, 74, 140, 1)', width: 2 }
      }
    };

    this.graph = {
      data: [confirmed, recovered, deceased],
      layout: {
        barmode: 'stack',
        autosize: true,
        title: 'States Affected',
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        margin: {
          l: 90,
          r: 50,
          b: 50,
          t: 50,
          pad: 1
        },
        xaxis: { showgrid: true },
        yaxis: {dticks: 1, showgrid: true},
        height:  (this.data.confirmed.length * 50)
      },
    };
  }

}
