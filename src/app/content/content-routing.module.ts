import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AddDogComponent } from './add-dog/add-dog.component';
import { ContentComponent } from './content.component';
import { DogDetailsComponent } from './dog-details/dog-details.component';

export const routes: Route[] = [
  {
    path: '',
    component: ContentComponent,
  },
  {
    path: 'add',
    component: AddDogComponent,
  },
  {
    path: ':id',
    component: DogDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentRoutingModule {}
