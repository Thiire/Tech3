package com.area.app.model;

import java.util.List;

public class UserArgs extends Data {
    private List<String> args;

    public UserArgs() {

    }

    public UserArgs(List<String> args) {
        this.args = args;
    }

    public List<String> getArgs() {
        return this.args;
    }

    public void setArgs(List<String> args) {
        this.args = args;
    }

    @Override
    public String toString() {
        return "{" +
            "args=" + this.args +
        "}";
    }
}
