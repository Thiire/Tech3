package com.area.app.model;

import java.util.List;

public class Reaction extends Data {
    private List<Arg> args;
    private String name;
    private String network;

    public Reaction() {

    }

    public Reaction(List<Arg> args, String name, String network) {
        this.args = args;
        this.name = name;
        this.network = network;
    }

    public List<Arg> getArgs() {
        return this.args;
    }

    public String getName() {
        return this.name;
    }

    public String getNetwork() {
        return this.network;
    }

    public void setArgs(List<Arg> args) {
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
