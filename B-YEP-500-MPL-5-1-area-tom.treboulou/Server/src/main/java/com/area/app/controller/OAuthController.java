package com.area.app.controller;

import java.io.IOException;
import java.net.URLEncoder;

import com.area.app.model.CodeBody;
import com.area.app.model.ReturnModel;
import com.area.app.model.TwitterCodeBody;
import com.area.app.model.UserService;
import com.area.app.model.YammerAccess;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import okhttp3.FormBody;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

@RestController
public class OAuthController {
    private void addUserService(String email, UserService service) {
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference ref = database.getReference("Users");

        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot data) {
                for (DataSnapshot child : data.getChildren()) {
                    String user = child.child("email").getValue(String.class);
                    if (user.compareTo(email) == 0) {
                        DatabaseReference serviceRef = ref.child(child.getKey() + "/services");
                        serviceRef.push().setValueAsync(service);
                    }
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {

            }
        });
    }

    @RequestMapping(value = "/dummyRedirect", method = RequestMethod.GET)
    public void dummyRedirect() {

    }

    @RequestMapping(value = "/discordRedirect", method = RequestMethod.POST)
    public void discordRedirect(@RequestHeader("id") String id, @RequestBody CodeBody code) throws IOException {
        System.out.println(code);
        OkHttpClient client = new OkHttpClient();
        okhttp3.RequestBody formBody = new FormBody.Builder().add("client_id", "817396403567067207")
                .add("client_secret", "TiktsFCZUMNiM3wQa3VgdwzwKrfdLYU_").add("grant_type", "authorization_code")
                .add("code", code.getCode()).add("redirect_uri", "http://localhost:8081/login")
                .add("scope", "identify email connections guilds gdm.join bot webhook.incoming messages.read").build();
        Request request = new Request.Builder().url("https://discord.com/api/oauth2/token").post(formBody).build();
        Response response = client.newCall(request).execute();
        if (!response.isSuccessful()) {
            throw new IOException("unexpected code" + response);
        }
        final Gson gson = new GsonBuilder().create();
        ReturnModel model = gson.fromJson(response.body().string(), ReturnModel.class);
        System.out.println(model);
        addUserService(code.getEmail(), new UserService("Discord", true, model.getAccessToken(), null,
                model.getWebhook().getToken(), model.getWebhook().getId(), id));
    }

    @RequestMapping(value = "/spotifyRedirect", method = RequestMethod.POST)
    public void spotifyRedirect(@RequestBody CodeBody code) throws IOException {
        System.out.println(code);
        OkHttpClient client = new OkHttpClient();
        okhttp3.RequestBody formBody = new FormBody.Builder().add("grant_type", "authorization_code")
                .add("code", code.getCode()).add("client_id", "28a27c4fc752448596e54fd1561062af")
                .add("redirect_uri", "http://localhost:8081/login")
                .add("client_secret", "8aedd4a33bd74806ab16b47dcafead01")
                .add("scope",
                        "user-library-modify user-follow-modify user-read-private user-read-email playlist-modify-private user-follow-modify playlist-modify-public user-library-read")
                .build();
        Request request = new Request.Builder().url("https://accounts.spotify.com/api/token").post(formBody).build();
        Response response = client.newCall(request).execute();
        if (!response.isSuccessful()) {
            throw new IOException("unexpected code" + response);
        }
        final Gson gson = new GsonBuilder().create();
        ReturnModel model = gson.fromJson(response.body().string(), ReturnModel.class);
        addUserService(code.getEmail(),
                new UserService("Spotify", true, model.getAccessToken(), null, null, null, null));
        System.out.println(model);
    }

    @RequestMapping(value = "/twitterRedirect", method = RequestMethod.POST)
    public void twitterRedirect(@RequestBody TwitterCodeBody code) throws IOException {
        System.out.println(code);
        OkHttpClient client = new OkHttpClient();
        okhttp3.RequestBody formBody = new FormBody.Builder().add("oauth_consumer_key", "shpUkJcajaffk9jXKXUFamh39")
                .add("oauth_token", code.getOauthToken()).add("oauth_verifier", code.getOauthVerifier()).build();
        Request request = new Request.Builder().url("https://api.twitter.com/oauth/access_token").post(formBody)
                .build();
        Response response = client.newCall(request).execute();
        if (!response.isSuccessful()) {
            throw new IOException("unexpected code" + response);
        }
        final Gson gson = new GsonBuilder().create();
        ReturnModel model = gson.fromJson(response.body().string(), ReturnModel.class);
        addUserService(code.getEmail(),
                new UserService("Twitter", true, model.getOauthToken(), model.getOauthTokenSecret(), null, null, null));
        System.out.println(model);
    }

    @RequestMapping(value = "/facebookRedirect", method = RequestMethod.POST)
    public void facebookRedirect(@RequestBody CodeBody code) throws IOException {
        System.out.println(code);
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder().url(
                "https://graph.facebook.com/v10.0/oauth/access_token?client_id=1057206764790869&client_secret=0343ec7f95beb10f494e83101262276f&redirect_uri=http://localhost:8081/login&code="
                        + code.getCode())
                .get().build();
        Response response = client.newCall(request).execute();
        if (!response.isSuccessful()) {
            throw new IOException("unexpected code" + response);
        }
        final Gson gson = new GsonBuilder().create();
        ReturnModel model = gson.fromJson(response.body().string(), ReturnModel.class);
        addUserService(code.getEmail(),
                new UserService("Facebook", true, model.getAccessToken(), null, null, null, null));
        System.out.println(model);
    }

    @RequestMapping(value = "/officeRedirect", method = RequestMethod.POST)
    public void officeRedirect(@RequestBody CodeBody code) throws IOException {
        System.out.println(code);
        System.out.println(URLEncoder.encode("-Qm1ru9vQ3s42~Y9_UgWj4r3-F5_VhSLcQ",
                java.nio.charset.StandardCharsets.UTF_8.toString()));
        OkHttpClient client = new OkHttpClient();
        okhttp3.RequestBody formBody = new FormBody.Builder().add("client_id", "781efdfd-b58e-4d06-aa52-7997478d6994")
                .add("scope", "user.read mail.read").add("code", code.getCode())
                .add("redirect_uri", "http://localhost:8081/login").add("grant_type", "authorization_code")
                .add("client_secret", URLEncoder.encode("-Qm1ru9vQ3s42~Y9_UgWj4r3-F5_VhSLcQ",
                        java.nio.charset.StandardCharsets.UTF_8.toString()))
                .build();
        Request request = new Request.Builder().url("https://login.microsoftonline.com/common/oauth2/v2.0/token")
                .post(formBody).build();
        Response response = client.newCall(request).execute();
        if (!response.isSuccessful()) {
            throw new IOException("unexpected code" + response);
        }
        final Gson gson = new GsonBuilder().create();
        ReturnModel model = gson.fromJson(response.body().string(), ReturnModel.class);
        addUserService(code.getEmail(),
                new UserService("Office", true, model.getAccessToken(), null, null, null, null));
        System.out.println(model);
    }

    @RequestMapping(value = "/twitchRedirect", method = RequestMethod.POST)
    public void twitchRedirect(@RequestBody CodeBody code) throws IOException {
        System.out.println(code);
        OkHttpClient client = new OkHttpClient();
        okhttp3.RequestBody formBody = new FormBody.Builder().add("client_id", "avbd4qpdl98cnyht1qmd83x5o0ynzm")
                .add("client_secret", "3qtecrge3yi6kizyul75h4x5cd0y5w").add("code", code.getCode())
                .add("grant_type", "authorization_code").add("redirect_uri", "http://localhost:8081/login").build();
        Request request = new Request.Builder().url("https://id.twitch.tv/oauth2/token").post(formBody).build();
        Response response = client.newCall(request).execute();
        if (!response.isSuccessful()) {
            throw new IOException("unexpected code" + response);
        }
        final Gson gson = new GsonBuilder().create();
        ReturnModel model = gson.fromJson(response.body().string(), ReturnModel.class);
        addUserService(code.getEmail(),
                new UserService("Twitch", true, model.getAccessToken(), null, null, null, null));
        System.out.println(model);
    }

    @RequestMapping(value = "/yammerRedirect", method = RequestMethod.POST)
    public void yammerRedirect(@RequestBody CodeBody code) throws IOException {
        System.out.println(code);
        OkHttpClient client = new OkHttpClient();
        Request request = new Request.Builder().url(
                "https://www.yammer.com/oauth2/access_token?client_id=bCsVCarsqNIEoQhTOIldQ&client_secret=IMouLyZOQJoImhghKzU5cGEqt1JUsA0SrO2ij6g&grant_type=authorization_code&code="
                        + code.getCode())
                .get().build();
        Response response = client.newCall(request).execute();
        if (!response.isSuccessful()) {
            throw new IOException("unexpected code" + response);
        }
        final Gson gson = new GsonBuilder().create();
        YammerAccess model = gson.fromJson(response.body().string(), YammerAccess.class);
        addUserService(code.getEmail(),
                new UserService("Yammer", true, model.getAccessToken().getToken(), null, null, null, null));
        System.out.println(model);
    }
}