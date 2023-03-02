package com.area.app.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;

import com.area.app.model.AboutReaction;
import com.area.app.model.AboutService;
import com.area.app.model.Client;
import com.area.app.model.Project;
import com.area.app.model.Server;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class About {
    @RequestMapping(value = "/about.json", method = RequestMethod.GET)
    public Project about() throws UnknownHostException {
        List<AboutReaction> actions;
        List<AboutReaction> reactions;
        List<AboutService> services = new ArrayList<>();
        Server server;
        Client client;

        actions = new ArrayList<AboutReaction>();
        reactions = new ArrayList<AboutReaction>();
        actions.add(new AboutReaction("new_like", "The user gains a like from one of their messages"));
        reactions.add(new AboutReaction("send_message", "The user sends a message"));
        services.add(new AboutService("Yammer", actions, reactions));

        actions = new ArrayList<AboutReaction>();
        reactions = new ArrayList<AboutReaction>();
        actions.add(new AboutReaction("join_a_server", "The user joins a new server"));
        reactions.add(new AboutReaction("send_message", "The user send a message"));
        services.add(new AboutService("discord", actions, reactions));

        actions = new ArrayList<AboutReaction>();
        reactions = new ArrayList<AboutReaction>();
        actions.add(new AboutReaction("liked_song", "User liked a song"));
        reactions.add(new AboutReaction("temp_reaction", "temp"));
        services.add(new AboutService("spotify", actions, reactions));

        actions = new ArrayList<AboutReaction>();
        reactions = new ArrayList<AboutReaction>();
        actions.add(new AboutReaction("have_follow", "New follower"));
        actions.add(new AboutReaction("goal_reached", "A goal has been reached"));
        actions.add(new AboutReaction("user_followed", "User followed another user"));
        reactions.add(new AboutReaction("temp_reaction", "temp"));
        services.add(new AboutService("twitch", actions, reactions));

        actions = new ArrayList<AboutReaction>();
        reactions = new ArrayList<AboutReaction>();
        actions.add(new AboutReaction("like_post", "The user likes a post"));
        actions.add(new AboutReaction("post_image", "The user posts image"));
        actions.add(new AboutReaction("receive_upvote", "The user receives an upvote"));
        actions.add(new AboutReaction("receive_downvote", "The user receives a downvote"));
        actions.add(new AboutReaction("receive_commentary", "The user receives a commentary"));
        actions.add(new AboutReaction("receive_favs", "The user receives a fav"));
        reactions.add(new AboutReaction("post_commentary", "Post commentary on picture"));
        services.add(new AboutService("imgur", actions, reactions));

        server = new Server(services);
        client = new Client(InetAddress.getLocalHost().getHostAddress());
        return new Project(client, server);
    }

    @RequestMapping(value ="/client.apk", method = RequestMethod.GET)
    public ResponseEntity<Resource> download() throws IOException
    {
        File file = new File("Area-e64f76791437423ba410dcefcac25856-signed.apk");
        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        return ResponseEntity.ok()
                .contentLength(file.length())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}
