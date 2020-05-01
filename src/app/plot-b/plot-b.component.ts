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

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.sortAndDisplay();
  }

  open(e, content) {
    console.log(content);
    console.log(e);
    this.selected_state = e.points[0].label.replace('<br>', ' ');
    this.graph2 = {
      data: [{
        type: 'pie',
        values: [ e.points[0].x, e.points[1].x, e.points[2].x ],
        labels: [e.points[0].data.name, e.points[1].data.name, e.points[2].data.name],
        textinfo: 'value+percent'
      }],

      layout: {
        title: "State Summary",
        autosize: true
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
      width: 0.7,
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
      width: 0.7,
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
        xaxis: { showgrid: true, fixedrange: true },
        yaxis: { showgrid: true, fixedrange: true },
        height: (this.data.confirmed.length * 50)
      }
    };
    // console.log(this.graph);
  }
}
