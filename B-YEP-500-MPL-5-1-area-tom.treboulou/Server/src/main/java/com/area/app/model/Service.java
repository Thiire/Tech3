package com.area.app.model;

import java.util.List;

public class Service extends Data {
    private List<Action> actions;
    private List<Reaction> reactions;
    private String name;

    public Service() {

    }

    public Service(List<Action> actions, List<Reaction> reactions, String name) {
        this.actions = actions;
        this.reactions = reactions;
        this.name = name;
    }

    public List<Action> getActions() {
        return this.actions;
    }

    public List<Reaction> getReactions() {
        return this.reactions;
    }

    public String getName() {
        return this.name;
    }

    public void setActions(List<Action> actions) {
        this.actions = actions;
    }

    public void setReactions(List<Reaction> reactions) {
        this.reactions = reactions;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "{" +
            "actions=" + this.actions +
            ",reactions=" + this.reactions +
            ",name='" + this.name + '\'' +
        "}";
    }
}