package com.area.app.model;

public class FacebookPageContent {
    private String access_token;
    private String name;
    private String id;

    public FacebookPageContent() {

    }

    public FacebookPageContent(String access_token, String name, String id) {
        this.access_token = access_token;
        this.name = name;
        this.id = id;
    }

    public String getAccessToken() {
        return this.access_token;
    }
    
    public String getName() {
        return this.name;
    }
    
    public String getId() {
        return this.id;
    }

    public void setAccessToken(String access_token) {
        this.access_token = access_token;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "{" +
            "access_token='" + this.access_token + '\'' +
            ",name='" + this.name + '\'' +
            ",id='" + this.id + '\'' +
        "}";
    }
}
