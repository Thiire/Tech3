package com.area.app.model;

public class ReturnModel {
    private String access_token;
    private String oauth_token;
    private String oauth_token_secret;
    private DiscordWebhook webhook;
    private YammerResp yammer;

    public ReturnModel() {

    }

    public ReturnModel(String access_token, String oauth_token, String oauth_token_secret, DiscordWebhook webhook, YammerResp yammer) {
        this.access_token = access_token;
        this.oauth_token = oauth_token;
        this.oauth_token_secret = oauth_token_secret;
        this.webhook = webhook;
        this.yammer = yammer;
    }

    public String getAccessToken() {
        return this.access_token;
    }

    public String getOauthToken() {
        return this.oauth_token;
    }

    public String getOauthTokenSecret() {
        return this.oauth_token_secret;
    }

    public DiscordWebhook getWebhook() {
        return this.webhook;
    }

    public YammerResp getYammer() {
        return this.yammer;
    }

    public void setAccessToken(String access_token) {
        this.access_token = access_token;
    }

    public void setOauthToken(String oauth_token) {
        this.oauth_token = oauth_token;
    }

    public void setOauthTokenSecret(String oauth_token_secret) {
        this.oauth_token_secret = oauth_token_secret;
    }

    public void setWebhook(DiscordWebhook webhook) {
        this.webhook = webhook;
    }

    public void setYammer(YammerResp yammer) {
        this.yammer = yammer;
    }

    @Override
    public String toString() {
        return "{" +
            "access_token='" + this.access_token + '\'' +
            ",oauth_token='" + this.oauth_token + '\'' +
            ",oauth_token_secret='" + this.oauth_token_secret + '\'' +
            ",webhook=" + this.webhook +
            ",yammer=" + this.yammer +
        "}";
    }
}
