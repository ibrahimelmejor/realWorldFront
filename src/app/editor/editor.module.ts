import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';
import { EditableArticleResolver } from './editable-article-resolver.service';
import { AuthGuard } from '../core';
import { SharedModule } from '../shared';
import { EditorRoutingModule } from './editor-routing.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [SharedModule,
    EditorRoutingModule,
    MatAutocompleteModule],
  declarations: [EditorComponent],
  providers: [EditableArticleResolver]
})
export class EditorModule {}
