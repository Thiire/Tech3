package com.area.app.controller;

import java.io.IOException;

import com.area.app.model.DiscordData;
import com.area.app.model.FacebookPageResponse;
import com.area.app.model.UserService;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.Gson;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class FacebookReactions {
    static public String getUserId(UserService token) throws IOException
    {
        OkHttpClient client = new OkHttpClient();
   
        Request request = new Request.Builder()
                .url("https://graph.facebook.com/me?fields=id,name&access_token=" + token.getToken()).build();
        Response resp = client.newCall(request).execute();
        if (!resp.isSuccessful()) {
            throw new IOException("unexpected code" + resp);
        }
        final Gson gson = new GsonBuilder().create();
        DiscordData model = gson.fromJson(resp.body().string(), DiscordData.class);
        System.out.println(model);
        return model.getId();
    }

    static public FacebookPageResponse getPageId(String id, UserService token) throws IOException
    {
        OkHttpClient client = new OkHttpClient();
   
        Request request = new Request.Builder()
                .url("https://graph.facebook.com/" + id + "/accounts?access_token=" + token.getToken()).build();
        Response resp = client.newCall(request).execute();
        if (!resp.isSuccessful()) {
            throw new IOException("unexpected code" + resp);
        }
        final Gson gson = new GsonBuilder().create();
        FacebookPageResponse model = gson.fromJson(resp.body().string(), FacebookPageResponse.class);
        System.out.println(model);
        return model;
    }

    static public void sendPagePost(String message, UserService token) throws IOException
    {
        OkHttpClient client = new OkHttpClient();
        FacebookPageResponse fb = getPageId(getUserId(token), token);

        Request request = new Request.Builder()
                .url("https://graph.facebook.com/" + fb.getData().getId() + "/feed?message=" + message 
                + "&access_token=" + fb.getData().getAccessToken()).build();
        Response resp = client.newCall(request).execute();
        if (!resp.isSuccessful()) {
            throw new IOException("unexpected code" + resp);
        }
        final Gson gson = new GsonBuilder().create();
        DiscordData model = gson.fromJson(resp.body().string(), DiscordData.class);
        System.out.println(model);
    }
}
