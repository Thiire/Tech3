package com.area.app.controller;

import org.springframework.web.bind.annotation.RestController;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;

import com.area.app.model.DiscordData;
import com.area.app.model.UserService;
import com.area.app.model.ImgurData;
import com.area.app.model.ImgurSubData;
import com.area.app.model.ListParams;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.exceptions.SpotifyWebApiException;
import com.wrapper.spotify.model_objects.specification.Paging;
import com.wrapper.spotify.model_objects.specification.SavedTrack;
import com.wrapper.spotify.model_objects.specification.User;
import com.wrapper.spotify.requests.data.library.CheckUsersSavedTracksRequest;
import com.wrapper.spotify.requests.data.library.GetUsersSavedTracksRequest;
import com.wrapper.spotify.requests.data.users_profile.GetCurrentUsersProfileRequest;

import org.apache.hc.core5.http.ParseException;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class ServicesController {
    private String getUserToken(String email, String service) {
        List<UserService> services = new ArrayList<UserService>();
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference ref = database.getReference("Users");
        CountDownLatch done = new CountDownLatch(1);

        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot data) {
                for (DataSnapshot child : data.getChildren()) {
                    String user = child.child("email").getValue(String.class);
                    if (user.compareTo(email) == 0) {
                        for (DataSnapshot areChild : child.child("services").getChildren()) {
                            UserService temp = areChild.getValue(UserService.class);
                            if (temp.getName().compareTo(service) == 0) {
                                services.add(temp);
                                done.countDown();
                                break;
                            }
                        }
                    }
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
        return services.get(0).getToken();
    }

    @RequestMapping(value = "/discordGuilds", method = RequestMethod.GET)
    public DiscordData[] discordGuilds(@RequestParam("email") String email) throws IOException {
        OkHttpClient client = new OkHttpClient();
        String token = getUserToken(email, "Discord");
        Request request = new Request.Builder().addHeader("Authorization", "Bearer " + token)
                .url("https://discord.com/api/users/@me/guilds").get().build();
        Response resp = client.newCall(request).execute();
        if (!resp.isSuccessful()) {
            throw new IOException("unexpected code" + resp);
        }
        final Gson gson = new GsonBuilder().create();
        DiscordData[] model = gson.fromJson(resp.body().string(), DiscordData[].class);
        return model;
    }

    @RequestMapping(value = "/discordGuildsChannels", method = RequestMethod.GET)
    public DiscordData[] discordGuildsChannel(@RequestParam("email") String email, @RequestParam("id") String id)
            throws IOException {
        OkHttpClient client = new OkHttpClient();
        String token = getUserToken(email, "Discord");
        Request request = new Request.Builder().addHeader("Authorization", "Bot " + token)
                .url("https://discord.com/api/guilds/" + id + "/channels").get().build();
        Response resp = client.newCall(request).execute();
        if (!resp.isSuccessful()) {
            throw new IOException("unexpected code" + resp);
        }
        final Gson gson = new GsonBuilder().create();
        DiscordData[] model = gson.fromJson(resp.body().string(), DiscordData[].class);
        for (DiscordData data : model)
            System.out.println("Model = " + data);
        return model;
    }

    @RequestMapping(value = "/discordChannelMessages", method = RequestMethod.GET)
    public DiscordData[] discordChannelMessages(@RequestParam("email") String email, @RequestParam("id") String id)
            throws IOException {
        OkHttpClient client = new OkHttpClient();
        String token = getUserToken(email, "Discord");
        Request request = new Request.Builder().addHeader("Authorization", "Bearer " + token)
                .url("https://discord.com/api/channels/" + id + "/messages").get().build();
        Response resp = client.newCall(request).execute();
        if (!resp.isSuccessful()) {
            throw new IOException("unexpected code" + resp);
        }
        final Gson gson = new GsonBuilder().create();
        DiscordData[] model = gson.fromJson(resp.body().string(), DiscordData[].class);
        for (DiscordData data : model)
            System.out.println("Model = " + data);
        return model;
    }

    @RequestMapping(value = "/getImgurPhotos", method = RequestMethod.GET)
    public List<ListParams> getImgurPhotos(@RequestHeader("email") String email)
            throws IOException {
        OkHttpClient client = new OkHttpClient();
        String token = getUserToken(email, "Imgur");
        Request request = new Request.Builder().url("https://api.imgur.com/3/account/me/submissions")
                .addHeader("Authorization", "Bearer " + token).build();
        Response resp = client.newCall(request).execute();
        if (!resp.isSuccessful()) {
            throw new IOException("unexpected code" + resp);
        }
        final Gson gson = new GsonBuilder().create();

        ImgurData model = gson.fromJson(resp.body().string(), ImgurData.class);
        List<ListParams> res = new ArrayList<>();

        for (ImgurSubData newData : model.getData()) {
            res.add(new ListParams(newData.getTitle(), newData.getId()));
        }
        return res;
    }

    @RequestMapping(value = ("/test"), method = RequestMethod.GET)
    public void test() throws IOException, ParseException, SpotifyWebApiException {
        DiscordAreas.createYammerMessage("1683730754", "Test Area", new UserService("Yammer", null, "106950-XWD9mlIpMFAFUdftZqu6A", null, null, null, null));
    }
}
