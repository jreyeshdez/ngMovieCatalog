import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, CanDeactivate } from '@angular/router';
import { MovieEditComponent } from './movie-edit.component';

@Injectable()
export class MovieDetailGuard implements CanActivate {
    constructor(private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        const id = route.url[1].path;
        if (id === '' || id === undefined) {
            alert('Invalid movie Id');
            // start a new navigation to redirect to list page
            this._router.navigate(['/movies']);
            // abort current navigation
            return false;
        }
        return true;
    }
}

@Injectable()
export class MovieEditGuard implements CanDeactivate<MovieEditComponent> {
    canDeactivate(component: MovieEditComponent): boolean {
        if (component.movieForm.dirty) {
            const title = component.movieForm.get('title').value || 'New Movie';
            return confirm(`Navigate away and lose all changes to ${title}?`);
        }
        return true;
    }
}
