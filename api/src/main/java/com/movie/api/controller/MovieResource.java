package com.movie.api.controller;

import com.movie.api.model.Movie;
import com.movie.api.service.MovieDAO;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.UUID;

@Path("/movies")
@RestController
public class MovieResource {

    MovieDAO dao = new MovieDAO();

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public List<Movie> findAll() {
        System.out.println("findAll");
        return dao.findAll();
    }

    @GET @Path("search/{title}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Movie> findByTitle(@PathParam("title") String title){
        System.out.println("findByTitle: "+title);
        return dao.findByTitle(title);
    }
    //curl -i -H "Accept: application/json" http://localhost:8090/movies/search/genre/Drama
    @GET @Path("search/genre/{genre}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Movie> findByGenre(@PathParam("genre") String genre){
        System.out.println("findByGenre: "+genre);
        return dao.findByGenre(genre);
    }

    @GET @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Movie findById(@PathParam("id") UUID id) {
        System.out.println("findById " + id);
        return dao.findById(id);
    }

    @POST
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Movie create(Movie movie) {
        return dao.create(movie);
    }

    @PUT @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Movie update(Movie movie) {
        System.out.println("Updating movie: " + movie.getTitle());
        dao.update(movie);
        return movie;
    }

    @DELETE @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public void remove(@PathParam("id") UUID id) {
        System.out.println("removing: "+id);
        dao.remove(id);
    }
}
