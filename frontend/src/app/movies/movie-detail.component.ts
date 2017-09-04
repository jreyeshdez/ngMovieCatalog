import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { IMovie } from './movie';
import { MovieService } from './movie.service';

@Component({
    templateUrl: 'movie-detail.component.html',
    styleUrls: ['movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit, OnDestroy {
    pageTitle = 'Movie Detail';
    movie: IMovie;
    errorMessage: string;
    private sub: Subscription;
    @Input() imgPath = 'assets/images/';

    constructor(private _route: ActivatedRoute,
                private _router: Router,
                private _movieService: MovieService) {
    }

    ngOnInit(): void {
        this.sub = this._route.params.subscribe(
            params => {
                const id = params['id'];
                this.getMovie(id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    private getMovie(id: string) {
        this._movieService.getMovie(id).subscribe(
            movie => this.movie = movie,
            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this._router.navigate(['/movies']);
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Movie Detail: ' + message;
    }
}
