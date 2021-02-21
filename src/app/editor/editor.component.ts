import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Article, ArticlesService } from '../core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {  TagsService } from '../core';

@Component({
  selector: 'app-editor-page',
  templateUrl: './editor.component.html'
})
export class EditorComponent implements OnInit {
  article: Article = {} as Article;
  articleForm: FormGroup;
  tagField = new FormControl();
  errors: Object = {};
  isSubmitting = false;
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private tagsService: TagsService,
  ) {
    // use the FormBuilder to create a form group
    this.articleForm = this.fb.group({
      title: '',
      description: '',
      body: '',
      tagList: []
    });

    // Initialized tagList as empty array
    this.article.tagList = [];
    // Optional: subscribe to value changes on the form
    // this.articleForm.valueChanges.subscribe(value => this.updateArticle(value));
  }
  tags: Array<string> = [];
  tagsLoaded = false;

  ngOnInit() {
    // If there's an article prefetched, load it
    this.route.data.subscribe((data: { article: Article }) => {
      if (data.article) {
        this.article = data.article;
        this.articleForm.patchValue(data.article);
      }
    });
  
 
      this.tagsService.getAll()
      .subscribe(tags => {
        for(var tag of tags)
        {
          tag = tag.replace(/[\u200c-\u200D\uFEFF]/g, '');
          if(tag !== "")
          {
            console.log(tag);
            this.tags.push(tag); 
          }
        }
        this.tagsLoaded = true;
        console.log(this.tags);
      });
 
     setTimeout(()=>
      {  
    this.filteredOptions = this.tagField.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }, 1800);
  }
  private _filter(value: string): string[] {
    console.log("Inside _filter : " + this.tags );
    const filterValue = value.toLowerCase();
    return this.tags.filter(tag => tag.toLowerCase().includes(filterValue));
  }
  
  addTag() {
    // retrieve tag control
    const tag = this.tagField.value;
    // only add tag if it does not exist yet
    if (this.article.tagList.indexOf(tag) < 0) {
      this.article.tagList.push(tag);
    }
    // clear the input
    this.tagField.reset('');
  }

  removeTag(tagName: string) {
    this.article.tagList = this.article.tagList.filter(tag => tag !== tagName);
  }

  submitForm() {
    this.isSubmitting = true;
    
    // update the model
this.articleForm.patchValue({
  tagList: [this.tagField.value]
  
});
    this.updateArticle(this.articleForm.value);
    // post the changes
    this.articlesService.save(this.article).subscribe(
      article => this.router.navigateByUrl('/article/' + article.slug),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  updateArticle(values: Object) {
    Object.assign(this.article, values);
  }
}
