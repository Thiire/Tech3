package com.area.app.model;

public class Area extends Data {
    private UserAction action;
    private UserReaction reaction;

    public Area() {
        
    }

    public Area(UserAction action, UserReaction reaction) {
        this.action = action;
        this.reaction = reaction;
    }

    public UserAction getAction() {
        return this.action;
    }

    public UserReaction getReaction() {
        return this.reaction;
    }

    public void setAction(UserAction action) {
        this.action = action;
    }

    public void setReaction(UserReaction reaction) {
        this.reaction = reaction;
    }

    @Override
    public String toString() {
        return "{" +
            "action=" + this.action +
            ",reaction=" + this.reaction +
        "}";
    }
}
