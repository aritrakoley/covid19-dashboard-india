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
  statesBr;
  confirmed;
  recovered;
  deceased;
  graph;

  constructor() { }

  ngOnInit(): void {
    this.statesBr = this.data.states.map((label) => {
      return label.replace(/ /g, '<br>');
    });

    this.confirmed = {
      name: 'Confirmed',
      type: 'bar',
      width: 0.6,
      x: this.data.confirmed,
      y: this.statesBr,
      orientation: 'h',
      marker: {
        color: 'rgba(0, 74, 140, 0.4)',
        line: { color: 'rgba(0, 74, 140, 1)', width: 2 }
      }
    };

    this.recovered = {
      name: 'Recovered',
      type: 'bar',
      width: 0.7,
      x: this.data.recovered,
      y: this.statesBr,
      orientation: 'h',
      marker: {
        color: 'rgba(0, 74, 140, 0.7)',
        line: { color: 'rgba(0, 74, 140, 1)', width: 2 }
      }
    };

    this.deceased = {
      name: 'Deceased',
      type: 'bar',
      width: 0.8,
      x: this.data.deceased,
      y: this.statesBr,
      orientation: 'h',
      marker: {
        color: 'rgba(0, 74, 140, 1)',
        line: { color: 'rgba(0, 74, 140, 1)', width: 2 }
      }
    };

    this.graph = {
      data: [this.confirmed, this.recovered, this.deceased],
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

    this.selectOrder();
  }

  removeTransforms() {
    delete this.graph.data[0].transforms;
    delete this.graph.data[1].transforms;
    delete this.graph.data[2].transforms;
  }

  selectOrder() {
    this.removeTransforms();

    if (this.orderBy === 'confirmed') {
      this.graph.data = [this.confirmed, this.recovered, this.deceased];
      this.graph.data[0].transforms = [{
        type: 'sort',
        target: 'y',
        order: ((this.dsc === '1') ? 'descending' : 'ascending')
      }];
      console.log({ 'a': this.orderBy, 'b': this.dsc, 'c': this.graph.data });
    }
    else if (this.orderBy === 'recovered') {
      console.log('RECOVERED');
      this.graph.data = [this.recovered, this.confirmed, this.deceased];
      this.graph.data[0].transforms = [{
        type: 'sort',
        target: 'y',
        order: ((this.dsc === '1') ? 'descending' : 'ascending')
      }];
      console.log({ 'a': this.orderBy, 'b': this.dsc, 'c': this.graph.data });
    }
    else if (this.orderBy === 'deceased') {
      console.log('DECEASED');
      this.graph.data = [this.deceased, this.recovered, this.confirmed];
      this.graph.data[0].transforms = [{
        type: 'sort',
        target: 'y',
        order: ((this.dsc === '1') ? 'descending' : 'ascending')
      }];
      console.log({ 'a': this.orderBy, 'b': this.dsc, 'c': this.graph.data });
    }
  }
}




// sortData() {
//   let arr = [];

//   //re-arrange data
//   for (let i = 0; i < this.statesBr.length; i++) {
//     arr[i] = {
//       state: this.statesBr[i],
//       confirmed: this.data.confirmed[i],
//       recovered: this.data.recovered[i],
//       deceased: this.data.deceased[i]
//     }
//   }
//   console.log(arr);

//   //sort based on orderBy and dsc
//   arr = arr.sort((a, b) => {
//     return a[this.orderBy] - b[this.orderBy];
//   });

//   if (this.dsc === '1') {
//     arr.reverse();
//   }

//   for (let i = 0; i < this.statesBr.length; i++)
//   {
//     this.statesBr[i] = arr[i].state;
//     this.data.confirmed[i] = arr[i].confirmed;
//     this.data.recovered[i] = arr[i].recovered;
//     this.data.deceased[i] = arr[i].deceased;
//   }

// }