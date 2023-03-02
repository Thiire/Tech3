package com.area.app.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;

import com.area.app.model.UserService;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.google.gson.JsonObject;

import okhttp3.FormBody;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class DiscordAreas {
    static private UserService getUserService(String email, String service) {
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
        return services.get(0);
    }

    static public void sendWebhookMessage(String message, UserService token) throws IOException {
        OkHttpClient client = new OkHttpClient();
        MediaType JSON = MediaType.parse("application/json");
        JsonObject obj = new JsonObject();
        obj.addProperty("content", message);

        System.out.println(token);
        RequestBody body = RequestBody.create(obj.toString(), JSON);
        Request request = new Request.Builder().addHeader("Authorization", "Bearer " + token.getToken())
                .url("https://discord.com/api/webhooks/" + token.getWebhookId() + "/" + token.getWebhookToken())
                .post(body).build();
        Response resp = client.newCall(request).execute();
        if (!resp.isSuccessful()) {
            throw new IOException("unexpected code" + resp);
        }
    }

    static public void ImgurSendMessage(String id, String message, UserService token) throws IOException {
        OkHttpClient client = new OkHttpClient();
        MediaType JSON = MediaType.parse("application/json");
        JsonObject obj = new JsonObject();
        obj.addProperty("image_id", id);
        obj.addProperty("comment", message);

        System.out.println(token);
        RequestBody body = RequestBody.create(obj.toString(), JSON);
        Request request = new Request.Builder().url("https://api.imgur.com/3/comment")
                .addHeader("Authorization", "Bearer " + token.getToken()).post(body).build();
        Response resp = client.newCall(request).execute();
        if (!resp.isSuccessful()) {
            throw new IOException("unexpected code" + resp);
        }
    }

    static public void createDmMessage(String id, UserService token) throws IOException {
        OkHttpClient client = new OkHttpClient();
        MediaType JSON = MediaType.parse("application/json");
        JsonObject obj = new JsonObject();
        obj.addProperty("content", "test");

        System.out.println(token);
        RequestBody body = RequestBody.create(obj.toString(), JSON);
        Request request = new Request.Builder().addHeader("Authorization", "Bearer " + token.getToken())
                .url("https://discord.com/api/webhooks/" + token.getWebhookId() + "/" + token.getWebhookToken())
                .post(body).build();
        Response resp = client.newCall(request).execute();
        if (!resp.isSuccessful()) {
            throw new IOException("unexpected code" + resp);
        }
    }

    static public void createYammerMessage(String userId, String message, UserService token) throws IOException
    {
        OkHttpClient client = new OkHttpClient();
        MediaType JSON = MediaType.parse("application/json");
        JsonObject obj = new JsonObject();
        obj.addProperty("direct_to_user_ids", userId);
        obj.addProperty("body", message);

        System.out.println(token.getToken());
        RequestBody body = RequestBody.create(obj.toString(), JSON);
        Request request = new Request.Builder().addHeader("Authorization", "Bearer " + token.getToken())
                .url("https://www.yammer.com/api/v1/messages.json")
                .post(body).build();
        Response resp = client.newCall(request).execute();
        if (!resp.isSuccessful()) {
            throw new IOException("unexpected code" + resp);
        }
    }


}
