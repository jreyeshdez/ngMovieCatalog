import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IMovie } from './movie';
import { MovieService } from './movie.service';

import { NumberValidators } from '../shared/number.validator';
import { GenericValidator } from '../shared/generic-validator';

@Component({
  templateUrl: 'movie-edit.component.html',
  styleUrls: ['movie-edit.component.css']
})
export class MovieEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  pageTitle = 'Movie Edit';
  errorMessage: string;
  movieForm: FormGroup;
  movie: IMovie;
  private sub: Subscription;

  displayMessage: { [key: string]: string} = {};
  private validationMessages: { [key: string]: { [key: string]: string} };
  private genericValidator: GenericValidator;

  get genres(): FormArray {
    return <FormArray>this.movieForm.get('genres');
  }

  constructor(private _fb: FormBuilder,
              private _route: ActivatedRoute,
              private _router: Router,
              private _movieService: MovieService) {

    this.validationMessages = {
      movieTitle: {
        required: 'Title is required.',
        minlength: 'Title must be at least three characters.',
        maxlength: 'Title cannot exceed 50 characters.'
      },
      movieYear: {
        required: 'Year is required.'
      },
      starRating: {
        range: 'Rate the movie between 1 (lowest) and 5 (highest).'
      }
    };
  }

  ngOnInit(): void {
    this.movieForm = this._fb.group({
      title: ['', [Validators.required,
                       Validators.minLength(3),
                       Validators.maxLength(50)]],
      year: ['', Validators.required],
      rating: ['', NumberValidators.range(1, 5)],
      genres: this._fb.array([]),
      description: ''
    });

    this.sub = this._route.params.subscribe(
      params => {
        const id = params['id'];
        this.getMovie(id);
      }
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {
    // Watch for the blur event from any input element on the form.
    const controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // Merge the blur event observable with the valueChanges observable
    Observable.merge(this.movieForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
      if (this.genericValidator !== undefined) {
        this.displayMessage = this.genericValidator.processMessages(this.movieForm);
      }
    });
  }

  getMovie(id: string): void {
    this._movieService.getMovie(id)
      .subscribe(
        (movie: IMovie) => this.onMovieRetrieved(movie),
        (error: any) => this.errorMessage = <any>error
      );
  }

  addGenre(): void {
    this.genres.push(new FormControl());
  }

  removeGenre(idx: number): void {
    this.genres.removeAt(idx);
    this.movieForm.markAsDirty();
  }

  onMovieRetrieved(movie: IMovie): void {
    if (this.movieForm) {
      this.movieForm.reset();
    }
    this.movie = movie;

    if (this.movie.id === '' || this.movie.id === undefined) {
        this.pageTitle = 'Add movie';
    } else {
        this.pageTitle = `Edit movie: ${this.movie.title}`;
    }

    // Update the data on the form
    this.movieForm.patchValue({
      title: this.movie.title,
      year: this.movie.year,
      rating: this.movie.rating,
      description: this.movie.description
    });
    this.movieForm.setControl('genres', this._fb.array(this.movie.genres || []));
  }

  deleteMovie(): void {
    if (this.movie.id === '' || this.movie.id === undefined) {
      this.onSaveComplete();
    } else {
      if (confirm(`Do you really want to delete ${this.movie.title}?`)) {
        this._movieService.deleteMovie(this.movie.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveMovie(): void {
    if (this.movieForm.dirty && this.movieForm.valid) {
        const p = Object.assign({}, this.movie, this.movieForm.value);
        this._movieService.saveMovie(p)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
    } else if (!this.movieForm.dirty) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): any {
    this.movieForm.reset();
    this._router.navigate(['/movies']);
  }
}
