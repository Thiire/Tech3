package com.area.app.model;

import java.util.List;

public class UserReaction extends Data {
    private List<String> args;
    private String name;
    private String network;

    public UserReaction() {

    }

    public UserReaction(List<String> args, String name, String network) {
        this.args = args;
        this.name = name;
        this.network = network;
    }

    public List<String> getArgs() {
        return this.args;
    }

    public String getName() {
        return this.name;
    }

    public String getNetwork() {
        return this.network;
    }

    public void setArgs(List<String> args) {
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
