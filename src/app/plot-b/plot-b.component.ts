import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'plot-b',
  templateUrl: './plot-b.component.html',
  styleUrls: ['./plot-b.component.css']
})
export class PlotBComponent implements OnInit {

  @Input() data;

  public orderBy = 'confirmed';
  public dsc = '1';
  public graph;
  public graph2: any;
  public selected_state: string;
  public selected_state_confirmed: string;

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.sortAndDisplay();
  }

  open(e, content) {
    //console.log(content);
    //console.log(e);
    this.selected_state = e.points[0].label.replace(/<br>/g, ' ');
    this.selected_state_confirmed = this.data.confirmed[this.data.states.indexOf(this.selected_state)]
    // console.log(this.selected_state);
    // console.log(this.selected_state_confirmed);


    let vals = [], lbls = [], clrs = [];
    let clrs_ref = [
      'rgba(255, 150, 0, 0.7)',     //active
      'rgba(0, 140, 74, 0.7)',     //recovered
      'rgba(140, 20, 20, 0.7)'     //deceased
    ];
    for (let i = 0; i < e.points.length; i++)
    {
      if( e.points[i].x > 0 )
      {
        vals.push(e.points[i].x);
        lbls.push(e.points[i].data.name);
        clrs.push(clrs_ref[i]);
      }
    }

    this.graph2 = {
      data: [{
        type: 'pie',
        values: vals,
        labels: lbls,
        marker: {
          colors: clrs
        },
        textinfo: 'value+percent'
      }],

      layout: {
        title: this.selected_state + " (" + this.selected_state_confirmed + ")",
        autosize: true,
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: {
          // family: 'Courier New, monospace',
          size: 15,
          color: '#000'
        }
      }
    };

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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
        deceased: this.data.deceased[i],
        active: this.data.active[i]
      };
    }

    dataArr = dataArr.sort((a, b) => {
      return (this.dsc === '1') ? (a[this.orderBy] - b[this.orderBy]) : (b[this.orderBy] - a[this.orderBy]);
    });

    let c = [], r = [], d = [], a = [], ann = [];
    for (let i = 0; i < statesBr.length; i++) {
      statesBr[i] = dataArr[i].state;
      c[i] = dataArr[i].confirmed;
      r[i] = dataArr[i].recovered;
      d[i] = dataArr[i].deceased;
      a[i] = dataArr[i].active;
    }

    const confirmed = {
      name: 'Confirmed',
      type: 'bar',
      width: 0.7,
      x: c,
      y: statesBr,
      orientation: 'h',
      marker: {
        color: 'rgba(0, 74, 140, 0.4)',
        line: { color: 'rgba(0, 74, 140, 1)', width: 2 }
      }
    };

    const active = {
      name: 'Active',
      type: 'bar',
      width: 0.7,
      x: a,
      y: statesBr,
      orientation: 'h',
      marker: {
        color: 'rgba(255, 150, 0, 0.7)',
        line: { color: 'rgba(0, 74, 140, 1)', width: 2 }
      },
    };

    const recovered = {
      name: 'Recovered',
      type: 'bar',
      width: 0.7,
      x: r,
      y: statesBr,
      orientation: 'h',
      marker: {
        color: 'rgba(0, 140, 74, 0.7)',
        line: { color: 'rgba(0, 74, 140, 1)', width: 2 }
      }
    };

    const deceased = {
      name: 'Deceased',
      type: 'bar',
      width: 0.7,
      x: d,
      y: statesBr,
      orientation: 'h',
      marker: {
        color: 'rgba(140, 20, 20, 0.7)',
        line: { color: 'rgba(0, 74, 140, 1)', width: 2 }
      },
      // text: c,
      // textposition: 'auto'
    };

    this.graph = {
      data: [active, recovered, deceased],
      layout: {
        barmode: 'stack',
        autosize: true,
        title: 'States Affected',
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        font: {
          // family: 'Courier New, monospace',
          size: 12,
          color: '#000'
        },
        margin: {
          l: 90,
          r: 50,
          b: 50,
          t: 50,
          pad: 1
        },
        xaxis: { showgrid: true, fixedrange: true },
        yaxis: { showgrid: true, fixedrange: true },
        height: (this.data.confirmed.length * 50),
        // legend: {
        //   x: 0,
        //   y: 1.05,
        //   xanchor: 'right'
        // }
      }
    };
    console.log(this.graph);
  }
}


/* Unused Code

ann[i] = {
        x: c[i],
        y: statesBr[i],
        xref: 'x',
        yref: 'y',
        text: String(c[i]),
        font: {
          color: "black",
          size: 14
        },
        bgcolor: '',
        showarrow: false
      };

*/