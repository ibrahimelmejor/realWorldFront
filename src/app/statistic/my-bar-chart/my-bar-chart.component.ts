import { Component, OnInit } from '@angular/core';
import { ApiService, Article } from '../../core';

@Component({
  selector: 'app-my-bar-chart',
  templateUrl: './my-bar-chart.component.html',
  styleUrls: ['./my-bar-chart.component.css']
})
export class MyBarChartComponent implements OnInit {
  results: Article[];

  constructor(private apiService: ApiService) { }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
  ngOnInit(): void {
    this.apiService.get('/articles/').subscribe(data => {
      this.results = data.articles;
      console.log(this.results);
      this.test();
    });



  }

  test(){
    for (const key in this.results) {
      if (Object.prototype.hasOwnProperty.call(this.results, key)) {

console.log(this.results[key]["tagList"]);
      }
    }
  }

}
