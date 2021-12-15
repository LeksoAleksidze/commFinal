import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dog-list-item',
  templateUrl: './dog-list-item.component.html',
  styleUrls: ['./dog-list-item.component.scss'],
})
export class DogListItemComponent implements OnInit {
  @Input() item: any | undefined;

  constructor(private router: Router) {}
  ngOnInit() {}

  goToDetails() {
    this.router.navigate([`content/${this.item?.data.imdbId}`]);
  }
}
