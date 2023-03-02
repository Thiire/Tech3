package com.area.app.model;

import java.sql.Timestamp;
import java.util.List;

public class Server {
    private String current_time;
    private List<AboutService> services;

    public Server() {

    }

    public Server(List<AboutService> services) {
        Timestamp tm = new Timestamp(System.currentTimeMillis());
        this.current_time = Long.toString(tm.getTime());
        this.services = services;
    }

    public String getCurrentTime() {
        return this.current_time;
    }

    public List<AboutService> getServices() {
        return this.services;
    }

    public void setCurrentTime(String current_time) {
        this.current_time = current_time;
    }

    public void setServices(List<AboutService> services) {
        this.services = services;
    }

    @Override
    public String toString() {
        return "{" + "current_time='" + this.current_time + '\'' + ",services=" + this.services + "}";
    }
}
