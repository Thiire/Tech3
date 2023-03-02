package com.area.app.model;

import java.util.List;

public class AboutService {
    private String name;
    private List<AboutReaction> actions;
    private List<AboutReaction> reactions;

    public AboutService() {

    }

    public AboutService(String name, List<AboutReaction> actions, List<AboutReaction> reactions) {
        this.name = name;
        this.actions = actions;
        this.reactions = reactions;
    }

    public String getName() {
        return this.name;
    }

    public List<AboutReaction> getActions() {
        return this.actions;
    }

    public List<AboutReaction> getReactions() {
        return this.reactions;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setActions(List<AboutReaction> actions) {
        this.actions = actions;
    }

    public void setReactions(List<AboutReaction> reactions) {
        this.reactions = reactions;
    }

    @Override
    public String toString() {
        return "{" +
            "name='" + this.name + '\'' +
            ",actions=" + this.actions +
            ",reactions=" + this.reactions +
        "}";
    }
}
