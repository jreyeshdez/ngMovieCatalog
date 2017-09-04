## Movie Catalog

RESTful application implemented in Java using JAX-RS 
and Cassandra for the Backend and Angular for the Frontend. 

It allows you to browse through a list of movies, 
where it is possible to add, update and delete movies 
as well as searches based on title.

The Frontend application has been implemented by following the Pluralsight courses
[Angular: Getting Started](https://www.pluralsight.com/courses/angular-2-getting-started-update) and
[Angular Reactive Forms](https://www.pluralsight.com/courses/angular-2-reactive-forms) by @DeborahK

Run `gradle bootRun` for the backend server to start and `npm start` for frontend server. Navigate to `http://localhost:4200/`.

### Stack

The application uses a number of open source projects to work properly:

- Java 1.8
- Angular
- Cassandra
- Gradle

The application uses [Accessor-annotated interface](http://docs.datastax.com/en/developer/java-driver-dse/1.4/manual/object_mapper/using/#accessors) for all CRUD operations.

### Set Up:

To run the application you need to install [Apache Cassandra.](http://docs.datastax.com/en/cassandra/latest/cassandra/install/installTOC.html)

Run `cqlsh -f movie_app.cql` to create the Keyspace "movie_ks" 
as well as create and populate the table "movies".