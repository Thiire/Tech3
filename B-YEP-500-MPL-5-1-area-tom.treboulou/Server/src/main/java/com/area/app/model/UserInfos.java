package com.area.app.model;

import java.util.List;

public class UserInfos extends Data {
    private List<Area> areas;
    private String email;
    private List<UserService> services;

    public UserInfos() {

    }

    public UserInfos(String email, List<Area> areas, List<UserService> services) {
        this.email = email;
        this.areas = areas;
        this.services = services;
    }

    public List<Area> getAreas() {
        return this.areas;
    }

    public String getEmail() {
        return this.email;
    }

    public List<UserService> getServices() {
        return this.services;
    }

    public void setAreas(List<Area> areas) {
        this.areas = areas;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setServices(List<UserService> services) {
        this.services = services;
    }

    @Override
    public String toString() {
        return "{" +
            "areas=" + this.areas + 
            "email='" + this.email + '\'' +
            "services=" + this.services +
        "}";
    }
}
