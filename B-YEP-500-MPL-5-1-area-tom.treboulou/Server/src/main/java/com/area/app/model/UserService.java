package com.area.app.model;

public class UserService extends Data {
    private String name;
    private Boolean connected;
    private String token;
    private String token_secret;
    private String webhook_token;
    private String webhook_id;
    private String guild_id;

    public UserService() {

    }

    public UserService(String name, Boolean connected, String token, String token_secret, String webhook_token, String webhook_id, String guild_id) {
        this.connected = connected;
        this.token = token;
        this.token_secret = token_secret;
        this.name = name;
        this.webhook_token = webhook_token;
        this.webhook_id = webhook_id;
        this.guild_id = guild_id;
    }

    public Boolean getConnected() {
        return this.connected;
    }

    public String getToken() {
        return this.token;
    }

    public String getName() {
        return this.name;
    }

    public String getTokenSecret() {
        return this.token_secret;
    }

    public String getWebhookToken() {
        return this.webhook_token;
    }

    public String getWebhookId() {
        return this.webhook_id;
    }

    public String getGuildId() {
        return this.guild_id;
    }

    public void setConnected(Boolean connected) {
        this.connected = connected;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setTokenSecret(String token_secret) {
        this.token_secret = token_secret;
    }

    public void setWebhookToken(String webhook_token) {
        this.webhook_token = webhook_token;
    }

    public void setWebhookId(String webhook_id) {
        this.webhook_id = webhook_id;
    }

    public void setGuildId(String guild_id) {
        this.guild_id = guild_id;
    }

    @Override
    public String toString() {
        return "{" +
            "connected='" + this.connected + '\'' +
            ",token='" + this.token + '\'' +
            ",name='" + this.name + '\'' +
            ",token_secret='" + this.token_secret + '\'' +
            ",webhook_token='" + this.webhook_token + '\'' +
            ",webhook_id='" + this.webhook_id + '\'' +
            ",guild_id='" + this.guild_id + '\'' +
        "}";
    }
}