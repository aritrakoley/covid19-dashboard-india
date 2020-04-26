import { Component, OnInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'plot-b',
  templateUrl: './plot-b.component.html',
  styleUrls: ['./plot-b.component.css']
})
export class PlotBComponent implements OnInit {

  @Input() data;

  orderBy = 'confirmed';
  dsc = '1';
  graph;

  constructor() { }

  ngOnInit(): void {
    this.sortAndDisplay();
  }

  sortAndDisplay() {
    let dataArr = [];
    const statesBr = this.data.states.map((label) => {
      return label.replace(/ /g, '<br>');
    });

    for (let i = 0; i < statesBr.length; i++) {
      dataArr[i] = {
        state: statesBr[i],
        confirmed: this.data.confirmed[i],
        recovered: this.data.recovered[i],
        deceased: this.data.deceased[i]
      };
    }

    dataArr = dataArr.sort((a, b) => {
      return (this.dsc === '1') ? (a[this.orderBy] - b[this.orderBy]) : (b[this.orderBy] - a[this.orderBy]);
    });

    let c = [], r = [], d = [];
    for (let i = 0; i < statesBr.length; i++) {
      statesBr[i] = dataArr[i].state;
      c[i] = dataArr[i].confirmed;
      r[i] = dataArr[i].recovered;
      d[i] = dataArr[i].deceased;
    }

    const confirmed = {
      name: 'Confirmed',
      type: 'bar',
      width: 0.6,
      x: c,
      y: statesBr,
      orientation: 'h',
      marker: {
        color: 'rgba(0, 74, 140, 0.4)',
        line: { color: 'rgba(0, 74, 140, 1)', width: 2 }
      }
    };

    const recovered = {
      name: 'Recovered',
      type: 'bar',
      width: 0.7,
      x: r,
      y: statesBr,
      orientation: 'h',
      marker: {
        color: 'rgba(0, 74, 140, 0.7)',
        line: { color: 'rgba(0, 74, 140, 1)', width: 2 }
      }
    };

    const deceased = {
      name: 'Deceased',
      type: 'bar',
      width: 0.8,
      x: d,
      y: statesBr,
      orientation: 'h',
      marker: {
        color: 'rgba(0, 74, 140, 1)',
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
        yaxis: { showgrid: true },
        height: (this.data.confirmed.length * 50)
      }
    };
    // console.log(this.graph);
  }
}
