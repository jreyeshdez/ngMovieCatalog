import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { IMovie } from '../movies/movie';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class MovieService {
  private baseUrl = 'http://localhost:8090/movies';

  constructor(private _http: Http) { }

  getMovies(): Observable<IMovie[]> {
    return this._http.get(this.baseUrl)
      .map(this.extractData)
      .do(data => console.log('getMovies: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getMovie(id: string): Observable<IMovie> {
    if (id === '0' || id === undefined) {
      return Observable.of(this.initializeMovie());
    }
    const url = `${this.baseUrl}/${id}`;
    return this._http.get(url)
      .map(this.extractData)
      .do(data => console.log('getMovie: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  saveMovie(movie: IMovie): Observable<IMovie> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    if (movie.id === '' || movie.id === undefined) {
      return this.createMovie(movie, options);
    }
    return this.updateMovie(movie, options);
  }

  createMovie(movie: IMovie, options: RequestOptions): Observable<IMovie> {
    movie.id = undefined;
    return this._http.post(this.baseUrl, movie, options)
      .map(this.extractData)
      .do(data => console.log('createMovie: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  updateMovie(movie: IMovie, options: RequestOptions): Observable<IMovie> {
    const url = `${this.baseUrl}/${movie.id}`;
    return this._http.put(url, movie, options)
      .map(this.extractData)
      .do(data => console.log('updateMovie: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteMovie(id: string): Observable<Response> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const url = `${this.baseUrl}/${id}`;
    return this._http.delete(url, options)
        .do(data => console.log('deleteMovie: ' + JSON.stringify(data)))
        .catch(this.handleError);
}

  private extractData(response: Response) {
    return response.json() || {};
  }

  private handleError(error: Response): Observable<any> {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

  initializeMovie(): IMovie {
    return {
        id: '',
        title: null,
        genres: [''],
        year: null,
        description: null,
        rating: null,
        picture: 'generic.jpg'
    };
  }
}
