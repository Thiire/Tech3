package com.area.app.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CountDownLatch;

import com.area.app.model.Area;
import com.area.app.model.Dao;
import com.area.app.model.UserInfos;
import com.area.app.model.ImgurData;
import com.area.app.model.ImgurSubData;
import com.area.app.model.TwitchChannelData;
import com.area.app.model.DiscordData;
import com.area.app.model.UserService;
import com.area.app.model.UserReaction;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import org.apache.hc.core5.http.ParseException;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.RestController;

import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.specification.Paging;
import com.wrapper.spotify.model_objects.specification.SavedTrack;
import com.wrapper.spotify.requests.data.library.GetUsersSavedTracksRequest;

import ch.qos.logback.core.subst.Token;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

@EnableAsync
@Configuration
@EnableScheduling
public class CronController {

    public String getTokenService(List<UserService> services, String network) {
        for (UserService srv : services) {
            if (srv.getName().compareTo(network) == 0) {
                return srv.getToken();
            }
        }
        return null;
    }

    public UserService getServiceFromUser(List<UserService> services, String network) {
        for (UserService srv : services) {
            if (srv.getName().compareTo(network) == 0) {
                return srv;
            }
        }
        return null;
    }

    public void sendReaction(List<UserService> services, UserReaction reaction, String str) throws IOException {
        switch (reaction.getNetwork()) {
        case "Discord":
            if (reaction.getName().compareTo("Envoyer un message") == 0) {
                DiscordAreas.sendWebhookMessage(reaction.getArgs().get(0) + ", " + str,
                        this.getServiceFromUser(services, "Discord"));
            } else {

            }
            break;
        case "Spotify":
            break;
        case "Facebook":
            break;
        case "Youtube":
            break;
        case "Twitch":
            break;
        case "Imgur":
            if (reaction.getName().compareTo("Poster un commentaire") == 0) {
                DiscordAreas.ImgurSendMessage(reaction.getArgs().get(0), reaction.getArgs().get(1) + ", " + str, this.getServiceFromUser(services, "Imgur"));
            }
            break;
        case "Yammer":
            if (reaction.getName().compareTo("Envoyer un message") == 0) {
                DiscordAreas.createYammerMessage("1683730754", reaction.getArgs().get(0), this.getServiceFromUser(services, "Yammer"));
            }
            break;
        default:
            break;
        }
    }

    static private List<UserInfos> getAllUsers() {
        List<UserInfos> users = new ArrayList<UserInfos>();
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference ref = database.getReference("Users");
        CountDownLatch done = new CountDownLatch(1);

        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot data) {
                for (DataSnapshot child : data.getChildren()) {
                    UserInfos user = new UserInfos();
                    List<Area> reaction = new ArrayList<Area>();
                    List<UserService> services = new ArrayList<UserService>();
                    user.setEmail(child.child("email").getValue(String.class));
                    for (DataSnapshot actChild : child.child("areas").getChildren()) {
                        reaction.add(actChild.getValue(Area.class));
                    }
                    user.setAreas(reaction);
                    for (DataSnapshot actChild : child.child("services").getChildren()) {
                        services.add(actChild.getValue(UserService.class));
                    }
                    user.setServices(services);
                    users.add(user);
                }
                done.countDown();
            }

            @Override
            public void onCancelled(DatabaseError error) {
                System.out.println(error.getMessage());
                done.countDown();
            }
        });
        try {
            done.await();
        } catch (InterruptedException e) {
            return null;
        }
        return users;
    }

    @Async
    @Scheduled(fixedRate = 10000)
    public void scheduledImgurCheck() throws IOException {
        Dao dao = Dao.getInstance();
        List<UserInfos> users = getAllUsers();
        String Token = "";

        for (UserInfos user : users) {
            for (Area area : user.getAreas()) {
                if (area.getAction().getNetwork().compareTo("Imgur") == 0) {
                    Token = this.getTokenService(user.getServices(), "Imgur");
                    if (area.getAction().getName().compareTo("Aimer une image") == 0) {
                        OkHttpClient client = new OkHttpClient();
                        Request request = new Request.Builder().url("https://api.imgur.com/3/account/me/favorites")
                                .addHeader("Authorization", "Bearer " + Token).build();
                        Response resp = client.newCall(request).execute();
                        if (!resp.isSuccessful()) {
                            throw new IOException("unexpected code" + resp);
                        }

                        final Gson gson = new GsonBuilder().create();
                        ImgurData model = gson.fromJson(resp.body().string(), ImgurData.class);

                        if (dao.getImgurFavoriteTokenData(Token) != null) {
                            for (ImgurSubData newData : model.getData()) {
                                boolean tmp = false;
                                for (ImgurSubData oldData : dao.getImgurFavoriteTokenData(Token)) {
                                    tmp = (newData.getLink().compareTo(oldData.getLink()) == 0) ? true : tmp;
                                }
                                if (!tmp) {
                                    this.sendReaction(user.getServices(), area.getReaction(), newData.getLink());
                                }
                            }
                        }
                        dao.setImgurFavoriteTokenData(Token, model.getData());
                    } else if (area.getAction().getName().compareTo("Poster une image") == 0) {
                        OkHttpClient client = new OkHttpClient();
                        Request request = new Request.Builder().url("https://api.imgur.com/3/account/me/images")
                                .addHeader("Authorization", "Bearer " + Token).build();
                        Response resp = client.newCall(request).execute();
                        if (!resp.isSuccessful()) {
                            throw new IOException("unexpected code" + resp);
                        }
                        final Gson gson = new GsonBuilder().create();
                        ImgurData model = gson.fromJson(resp.body().string(), ImgurData.class);

                        if (dao.getImgurImageTokenData(Token) != null) {
                            for (ImgurSubData newData : model.getData()) {
                                boolean tmp = false;
                                for (ImgurSubData oldData : dao.getImgurImageTokenData(Token)) {
                                    tmp = (newData.getLink().compareTo(oldData.getLink()) == 0) ? true : tmp;
                                }
                                if (!tmp) {
                                    this.sendReaction(user.getServices(), area.getReaction(), newData.getLink());
                                }
                            }
                        }
                        dao.setImgurImageTokenData(Token, model.getData());
                    } else if (area.getAction().getName().compareTo("Recevoir un upVote") == 0) {
                        OkHttpClient client = new OkHttpClient();
                        Request request = new Request.Builder().url("https://api.imgur.com/3/account/me/submissions")
                                .addHeader("Authorization", "Bearer " + Token).build();
                        Response resp = client.newCall(request).execute();
                        if (!resp.isSuccessful()) {
                            throw new IOException("unexpected code" + resp);
                        }
                        final Gson gson = new GsonBuilder().create();

                        ImgurData model = gson.fromJson(resp.body().string(), ImgurData.class);
                        if (dao.getImgurStatUpsTokenData(Token) != null) {
                            for (ImgurSubData newData : model.getData()) {

                                for (ImgurSubData oldData : dao.getImgurStatUpsTokenData(Token)) {
                                    if (newData.getLink().compareTo(oldData.getLink()) == 0) {
                                        if (newData.getUps() > oldData.getUps()) {
                                            this.sendReaction(user.getServices(), area.getReaction(),
                                                    newData.getUps() + " upVotes !\n" + newData.getLink());
                                        }
                                    }
                                }
                            }
                        }
                        dao.setImgurStatUpsTokenData(Token, model.getData());
                    } else if (area.getAction().getName().compareTo("Recevoir un downVote") == 0) {
                        OkHttpClient client = new OkHttpClient();
                        Request request = new Request.Builder().url("https://api.imgur.com/3/account/me/submissions")
                                .addHeader("Authorization", "Bearer " + Token).build();
                        Response resp = client.newCall(request).execute();
                        if (!resp.isSuccessful()) {
                            throw new IOException("unexpected code" + resp);
                        }
                        final Gson gson = new GsonBuilder().create();

                        ImgurData model = gson.fromJson(resp.body().string(), ImgurData.class);
                        if (dao.getImgurStatDownsTokenData(Token) != null) {
                            for (ImgurSubData newData : model.getData()) {

                                for (ImgurSubData oldData : dao.getImgurStatDownsTokenData(Token)) {
                                    if (newData.getLink().compareTo(oldData.getLink()) == 0) {
                                        if (newData.getDowns() > oldData.getDowns()) {
                                            this.sendReaction(user.getServices(), area.getReaction(),
                                                    newData.getDowns() + " DownVotes !\n" + newData.getLink());
                                        }
                                    }
                                }
                            }
                        }
                        dao.setImgurStatDownsTokenData(Token, model.getData());

                    } else if (area.getAction().getName().compareTo("Recevoir un commentaire") == 0) {
                        OkHttpClient client = new OkHttpClient();
                        Request request = new Request.Builder().url("https://api.imgur.com/3/account/me/submissions")
                                .addHeader("Authorization", "Bearer " + Token).build();
                        Response resp = client.newCall(request).execute();
                        if (!resp.isSuccessful()) {
                            throw new IOException("unexpected code" + resp);
                        }
                        final Gson gson = new GsonBuilder().create();

                        ImgurData model = gson.fromJson(resp.body().string(), ImgurData.class);
                        if (dao.getImgurStatCommentTokenData(Token) != null) {
                            for (ImgurSubData newData : model.getData()) {

                                for (ImgurSubData oldData : dao.getImgurStatCommentTokenData(Token)) {
                                    if (newData.getLink().compareTo(oldData.getLink()) == 0) {
                                        if (newData.getCommentCount() > oldData.getCommentCount()) {
                                            this.sendReaction(user.getServices(), area.getReaction(),
                                                    newData.getCommentCount() + " Comments !\n" + newData.getLink());
                                        }
                                    }
                                }
                            }
                        }
                        dao.setImgurStatCommentTokenData(Token, model.getData());

                    } else if (area.getAction().getName().compareTo("Recevoir un favoris") == 0) {
                        OkHttpClient client = new OkHttpClient();
                        Request request = new Request.Builder().url("https://api.imgur.com/3/account/me/submissions")
                                .addHeader("Authorization", "Bearer " + Token).build();
                        Response resp = client.newCall(request).execute();
                        if (!resp.isSuccessful()) {
                            throw new IOException("unexpected code" + resp);
                        }
                        final Gson gson = new GsonBuilder().create();

                        ImgurData model = gson.fromJson(resp.body().string(), ImgurData.class);
                        if (dao.getImgurStatFavTokenData(Token) != null) {
                            for (ImgurSubData newData : model.getData()) {

                                for (ImgurSubData oldData : dao.getImgurStatFavTokenData(Token)) {
                                    if (newData.getLink().compareTo(oldData.getLink()) == 0) {
                                        if (newData.getFavoriteCount() > oldData.getFavoriteCount()) {
                                            this.sendReaction(user.getServices(), area.getReaction(),
                                                    newData.getFavoriteCount() + " Favorites !\n" + newData.getLink());
                                        }
                                    }
                                }
                            }
                        }
                        dao.setImgurStatFavTokenData(Token, model.getData());
                    }
                }
            }
        }
        ;
    }

    @Async
    @Scheduled(fixedRate = 10000)
    public void scheduledDiscordCheck() throws IOException {
        Dao dao = Dao.getInstance();
        List<UserInfos> users = getAllUsers();
        String Token = "";

        for (UserInfos user : users) {
            for (Area area : user.getAreas()) {
                if (area.getAction().getNetwork().compareTo("Discord") == 0) {
                    Token = this.getTokenService(user.getServices(), "Discord");
                    if (area.getAction().getName().compareTo("Rejoindre un serveur") == 0) {
                        OkHttpClient client = new OkHttpClient();
                        Request request = new Request.Builder().addHeader("Authorization", "Bearer " + Token)
                                .url("https://discord.com/api/users/@me/guilds").get().build();
                        Response resp = client.newCall(request).execute();
                        if (!resp.isSuccessful()) {
                            throw new IOException("unexpected code" + resp);
                        }
                        final Gson gson = new GsonBuilder().create();
                        DiscordData[] model = gson.fromJson(resp.body().string(), DiscordData[].class);

                        if (dao.getDiscordTokenData(Token) != null) {
                            for (DiscordData newData : model) {
                                boolean tmp = false;
                                for (DiscordData oldData : dao.getDiscordTokenData(Token)) {
                                    tmp = (newData.getId().compareTo(oldData.getId()) == 0) ? true : tmp;
                                }
                                if (!tmp) {
                                    this.sendReaction(user.getServices(), area.getReaction(), newData.getName());
                                }
                            }
                        }
                        dao.setDiscordTokenData(Token, Arrays.asList(model));
                    }
                }
            }
        }
        ;
    }

    @Async
    @Scheduled(fixedRate = 10000)
    public void scheduledTwitchCheck() throws IOException {
        Dao dao = Dao.getInstance();
        List<UserInfos> users = getAllUsers();
        String Token = "";
        for (UserInfos user : users) {
            for (Area area : user.getAreas()) {
                if (area.getAction().getNetwork().compareTo("Twitch") == 0) {
                    Token = this.getTokenService(user.getServices(), "Twitch");
                    if (area.getAction().getName().compareTo("Recevoir un follow") == 0) {
                        OkHttpClient client = new OkHttpClient();
                        Request request = new Request.Builder().addHeader("Authorization", "OAuth " + Token)
                                .addHeader("Client-ID", "avbd4qpdl98cnyht1qmd83x5o0ynzm")
                                .addHeader("Accept", "application/vnd.twitchtv.v5+json")
                                .url("https://api.twitch.tv/kraken/channel").get().build();
                        Response resp = client.newCall(request).execute();
                        if (!resp.isSuccessful()) {
                            throw new IOException("unexpected code" + resp);
                        }
                        final Gson gson = new GsonBuilder().create();
                        TwitchChannelData model = gson.fromJson(resp.body().string(), TwitchChannelData.class);

                        if (dao.getTwitchFollowTokenData(Token) != null) {
                            if (model.getFollowers() > dao.getTwitchFollowTokenData(Token).getFollowers()) {
                                this.sendReaction(user.getServices(), area.getReaction(),
                                        "nouveau followers, " + model.getFollowers() + " total !");
                            }
                        }
                        dao.setTwitchFollowTokenData(Token, model);
                    }
                }
            }
        }
        ;
    }

    @Async
    @Scheduled(fixedRate = 10000)
    public void scheduledSpotify() throws IOException, ParseException, SpotifyWebApiException {
        Dao dao = Dao.getInstance();
        List<UserInfos> users = getAllUsers();
        String Token = "";

        for (UserInfos user : users) {
            for (Area area : user.getAreas()) {
                if (area.getAction().getNetwork().compareTo("Spotify") == 0) {
                    Token = this.getTokenService(user.getServices(), "Spotify");
                    if (area.getAction().getName().compareTo("Liker une musique") == 0) {
                        SpotifyApi spot = new SpotifyApi.Builder().setAccessToken(Token).build();
                        GetUsersSavedTracksRequest check = spot.getUsersSavedTracks().limit(5).build();
                        CompletableFuture<Paging<SavedTrack>> future = check.executeAsync();
                        Paging<SavedTrack> savedTrack = future.join();

                        if (dao.getSpotifyLikesTokenData(Token) != null) {
                            SavedTrack newData = savedTrack.getItems()[0];
                            boolean tmp = false;
                            for (SavedTrack oldData : dao.getSpotifyLikesTokenData(Token)) {
                                tmp = (newData.getTrack().getId().compareTo(oldData.getTrack().getId()) == 0) ? true
                                        : tmp;
                            }
                            if (!tmp) {
                                this.sendReaction(user.getServices(), area.getReaction(),
                                        "'" + newData.getTrack().getName() + "' a été ajouté aux likes !");
                            }
                        }
                        dao.setSpotifyLikesTokenData(Token, Arrays.asList(savedTrack.getItems()));
                    }

                }
            }
        }
    }

    @Async
    @Scheduled(fixedRate = 10000)
    public void scheduledYoutube() throws IOException {
        Dao dao = Dao.getInstance();
        List<UserInfos> users = getAllUsers();
        String Token = "";

        for (UserInfos user : users) {
            for (Area area : user.getAreas()) {
                if (area.getAction().getNetwork().compareTo("Spotify") == 0) {
                    Token = this.getTokenService(user.getServices(), "Spotify");
                    if (area.getAction().getName().compareTo("Liker une musique") == 0) {
                        SpotifyApi spot = new SpotifyApi.Builder().setAccessToken(Token).build();
                        GetUsersSavedTracksRequest check = spot.getUsersSavedTracks().limit(5).build();
                        CompletableFuture<Paging<SavedTrack>> future = check.executeAsync();
                        Paging<SavedTrack> savedTrack = future.join();

                        if (dao.getSpotifyLikesTokenData(Token) != null) {
                            SavedTrack newData = savedTrack.getItems()[0];
                            boolean tmp = false;
                            for (SavedTrack oldData : dao.getSpotifyLikesTokenData(Token)) {
                                tmp = (newData.getTrack().getId().compareTo(oldData.getTrack().getId()) == 0) ? true
                                        : tmp;
                            }
                            if (!tmp) {
                                this.sendReaction(user.getServices(), area.getReaction(),
                                        "'" + newData.getTrack().getName() + "' a été ajouté aux likes !");
                            }
                        }
                        dao.setSpotifyLikesTokenData(Token, Arrays.asList(savedTrack.getItems()));
                    }

                }
            }
        }
    }
}
