import { Component, OnInit, Input } from '@angular/core';
import { IMovie } from './movie';
import { MovieService } from './movie.service';

@Component({
  templateUrl: 'movie-list.component.html',
  styleUrls: ['movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  pageTitle = 'Movie List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  listFilter: string;
  errorMessage: string;
  movies: IMovie[];
  @Input() imgPath = 'assets/images/';

  constructor(private _movieService: MovieService) {}

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this._movieService.getMovies()
      .subscribe(movies => this.movies = movies,
                 error => this.errorMessage = <any>error);
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Movie List: ' + message;
  }

}
