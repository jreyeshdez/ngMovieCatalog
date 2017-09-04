package com.movie.api.config;

import com.movie.api.controller.MovieResource;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JerseyConfiguration extends ResourceConfig {
    public JerseyConfiguration(){
        register(MovieResource.class);
    }
}
