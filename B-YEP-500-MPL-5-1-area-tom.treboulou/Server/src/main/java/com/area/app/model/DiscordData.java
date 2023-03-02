package com.area.app.model;

public class DiscordData {
    private String id;
    private String name;

    public DiscordData() {

    }

    public DiscordData(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "{" +
            "id='" + this.id + '\'' +
            ",name='" + this.name + '\'' +
        "}";
    }
}
