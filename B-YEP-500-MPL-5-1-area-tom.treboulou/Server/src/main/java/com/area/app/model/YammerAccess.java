package com.area.app.model;

public class YammerAccess {
    private YammerResp access_token;

    public YammerAccess() {

    }

    public YammerAccess(YammerResp access_token) {
        this.access_token = access_token;
    }

    public YammerResp getAccessToken() {
        return this.access_token;
    }

    public void setAccessToken(YammerResp access_token) {
        this.access_token = access_token;
    }

    @Override
    public String toString() {
        return "{" +
            "access_token=" + this.access_token +
        "}";
    }
}
