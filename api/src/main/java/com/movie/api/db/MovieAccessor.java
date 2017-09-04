package com.movie.api.db;

import com.datastax.driver.core.ResultSet;
import com.datastax.driver.mapping.Result;
import com.datastax.driver.mapping.annotations.Accessor;
import com.datastax.driver.mapping.annotations.Param;
import com.datastax.driver.mapping.annotations.Query;
import com.movie.api.model.Movie;

import java.util.Set;
import java.util.UUID;

@Accessor
public interface MovieAccessor {
    @Query("SELECT * FROM movie_ks.movies")
    Result<Movie> getAll();

    @Query("SELECT * FROM movie_ks.movies WHERE title = :title")
    Result<Movie> findByTitle(@Param("title") String title);

    @Query("SELECT * FROM movie_ks.movies WHERE genres CONTAINS :genre")
    Result<Movie> findByGenre(@Param("genre") String genre);

    @Query("SELECT * FROM movie_ks.movies WHERE id = :id")
    Movie findById(@Param("id") UUID id);

    @Query("DELETE FROM movie_ks.movies WHERE id = :id")
    ResultSet delete(@Param("id") UUID id);

    @Query("UPDATE movie_ks.movies SET " +
            "title=:title," +
            "year=:year," +
            "picture=:picture," +
            "description=:description, " +
            "genres=:genres, " +
            "rating=:rating " +
            "WHERE id=:id")
    Movie update(@Param("id") UUID id,
                @Param("title") String title,
                @Param("year") String year,
                @Param("picture") String picture,
                @Param("description") String description,
                @Param("genres") Set<String> genres,
                @Param("rating") float rating);

    @Query("INSERT INTO movie_ks.movies (id, title, year, picture, description, genres, rating) " +
            "VALUES (:id, :title, :year, :picture, :description, :genres, :rating)")
    Movie create(@Param("id") UUID id,
                @Param("title") String title,
                @Param("year") String year,
                @Param("picture") String picture,
                @Param("description") String description,
                @Param("genres") Set<String> genres,
                @Param("rating") float rating);
}
