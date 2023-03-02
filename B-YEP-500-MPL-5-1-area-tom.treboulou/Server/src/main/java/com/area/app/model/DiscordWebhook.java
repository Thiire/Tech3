package com.area.app.model;

public class DiscordWebhook {
    private String token;
    private String id;

    public DiscordWebhook() {

    }

    public DiscordWebhook(String token, String id) {
        this.token = token;
    }

    public String getToken() {
        return this.token;
    }

    public String getId() {
        return this.id;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "{" +
            "token='" + this.token + '\'' +
            ",id='" + this.id + '\'' +
        "}";
    }
}
