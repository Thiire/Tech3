package com.area.app.model;

public class Project {
    private Client client;
    private Server server;

    public Project() {

    }

    public Project(Client client, Server server) {
        this.client = client;
        this.server = server;
    }

    public Client getClient() {
        return this.client;
    }

    public Server getServer() {
        return this.server;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public void setServer(Server server) {
        this.server = server;
    }

    @Override
    public String toString() {
        return "{" + "client=" + this.client + ",server=" + this.server + "}";
    }
}
