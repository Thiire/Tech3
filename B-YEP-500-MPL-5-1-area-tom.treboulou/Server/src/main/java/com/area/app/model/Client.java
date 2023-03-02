package com.area.app.model;

public class Client {
    private String host;

    public Client() {

    }

    public Client(String host) {
        this.host = host;
    }

    public String getHost() {
        return this.host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    @Override
    public String toString() {
        return "{" +
            "host='" + this.host + '\'' +
        "}";
    }
}
