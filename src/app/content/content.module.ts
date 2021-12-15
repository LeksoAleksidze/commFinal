import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { AddDogComponent } from './add-dog/add-dog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ContentRoutingModule } from './content-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { addDogApiServices, CountriesApiService } from './services';
import { CharacterDirective } from './add-dog/character.directive';
import { DogListComponent, DogListItemComponent } from './dog-list';
import { DogDetailsComponent } from './dog-details/dog-details.component';
import { addDogFacade } from './add-dog/add-dog.facade';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentRoutingModule,
    SharedModule,
    TranslateModule,
  ],
  declarations: [
    ContentComponent,
    AddDogComponent,
    CharacterDirective,
    DogListComponent,
    DogListItemComponent,
    DogDetailsComponent,
  ],
  providers: [addDogApiServices, CountriesApiService, addDogFacade],
})
export class ContentModule {}
