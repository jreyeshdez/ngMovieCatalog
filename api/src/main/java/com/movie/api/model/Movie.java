package com.movie.api.model;

import com.datastax.driver.mapping.annotations.Table;

import javax.xml.bind.annotation.XmlRootElement;
import java.util.Set;
import java.util.UUID;

@Table(keyspace = "movie_ks", name = "movies")
@XmlRootElement
public class Movie {

    private UUID id;
    private String title;
    private String year;
    private String picture;
    private String description;
    private Set<String> genres;
    private float rating;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<String> getGenres(){ return this.genres; }

    public void setGenres(Set<String> genres){ this.genres = genres; }

    public float getRating(){ return this.rating; }

    public void setRating(float rating){ this.rating = rating; }
}