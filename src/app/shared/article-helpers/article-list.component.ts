import {Component, Input, OnInit} from '@angular/core';

import { Article, ArticleListConfig, ArticlesService } from '../../core';
import {PrimeNGConfig, SelectItem} from 'primeng/api';
@Component({
  selector: 'app-article-list',
  styleUrls: ['article-list.component.css'],
  templateUrl: './article-list.component.html'
})

export class ArticleListComponent implements OnInit {

  filtre = '';
  products: Article[];

  sortKey: any;

  sortOptions: SelectItem[];

  sortOrder: number;

  sortField: string;

  constructor (
    private primengConfig: PrimeNGConfig,
    private articlesService: ArticlesService
  ) {}

  @Input() limit: number;
  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  selectedValue = 'title';
  properties = ['title', 'slug',
  'description',
  'body'];


  searchArticleName = '';
  query: ArticleListConfig;
  results: Article[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];

  ngOnInit(): void {
    // this.productService.getProducts().then(data => this.products = data);

    this.sortOptions = [
      {
        label: 'Title',
        value: 'tittle'
      },
      {
        label: 'Slug',
        value: 'slug'
      },
      {
        label: 'Description',
        value: 'description'
      },
      {
        label: 'Body',
        value: 'body'
      },
    ];

    this.runQuery2();

    this.sortOptions = [
      {label: 'Price High to Low', value: '!price'},
      {label: 'Price Low to High', value: 'price'}
    ];

    this.primengConfig.ripple = true;
  }

  onSortChange(event) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery2() {
    this.loading = true;
    this.results = [];

    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset =  (this.limit * (this.currentPage - 1));
    }

    this.articlesService.query(this.query)
      .subscribe(data => {
        this.loading = false;
        this.products = data.articles;

        // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
        this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + 1);
      });
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset =  (this.limit * (this.currentPage - 1));
    }

    this.articlesService.query(this.query)
    .subscribe(data => {
      this.loading = false;
      this.results = data.articles;

      // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
      this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + 1);
    });
  }

  onToggleFavorite(favorited: boolean) {
    this.products['favorited'] = favorited;

    if (favorited) {
      this.products['favoritesCount']++;
    } else {
      this.products['favoritesCount']--;
    }
  }
}
