package com.area.app.model;

public class AboutReaction {
    private String name;
    private String description;

    public AboutReaction() {

    }

    public AboutReaction(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public String getName() {
        return this.name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "{" +
            "name='" + this.name + '\'' +
            ",description='" + this.description + '\'' +
        "}";
    }
}
