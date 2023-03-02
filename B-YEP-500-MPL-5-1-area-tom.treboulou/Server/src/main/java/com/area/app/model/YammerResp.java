package com.area.app.model;

public class YammerResp {
    private String token;

    public YammerResp() {

    }

    public YammerResp(String token) {
        this.token = token;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public String toString() {
        return "{" +
            "token=" + this.token +
        "}";
    }
}
