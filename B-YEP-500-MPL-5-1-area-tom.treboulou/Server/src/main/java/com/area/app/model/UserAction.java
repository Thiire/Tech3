package com.area.app.model;

import java.util.List;

public class UserAction extends Data {
    private List<UserArgs> args;
    private String name;
    private String network;

    public UserAction() {
    }

    public UserAction(List<UserArgs> args, String name, String network) {
        this.args = args;
        this.name = name;
        this.network = network;
    }

    public List<UserArgs> getArgs() {
        return this.args;
    }

    public String getName() {
        return this.name;
    }

    public String getNetwork() {
        return this.network;
    }

    public void setArgs(List<UserArgs> args) {
        this.args = args;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setNetwork(String network) {
        this.network = network;
    }

    @Override
    public String toString() {
        return "{" +
            "args=" + this.args +
            ",name='" + this.name + '\'' +
            ",network='" + this.network + '\'' +
        "}";
    }
}
