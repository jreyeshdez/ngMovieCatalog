import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MovieListComponent } from './movie-list.component';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieDetailGuard, MovieEditGuard } from './movie-guard.service';
import { MovieEditComponent } from './movie-edit.component';

import { MovieFilterPipe } from './movie-filter.pipe';
import { MovieService } from './movie.service';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'movies', component: MovieListComponent },
      { path: 'movie/:id',
        canActivate: [ MovieDetailGuard],
        component: MovieDetailComponent
      },
      { path: 'movieEdit/:id',
        canDeactivate: [ MovieEditGuard ],
        component: MovieEditComponent },
    ])
  ],
  declarations: [
    MovieListComponent,
    MovieDetailComponent,
    MovieEditComponent,
    MovieFilterPipe
  ],
  providers: [
    MovieService,
    MovieDetailGuard,
    MovieEditGuard
  ]
})
export class MovieModule {}
