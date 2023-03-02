package com.area.app.model;

public class FacebookPageResponse {
    private FacebookPageContent data;

    public FacebookPageResponse() {

    }

    public FacebookPageResponse(FacebookPageContent data) {
        this.data = data;
    }

    public FacebookPageContent getData() {
        return this.data;
    }

    public void setData(FacebookPageContent data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "{" +
            "data='" + this.data + '\'' +
        "}";
    }
}
