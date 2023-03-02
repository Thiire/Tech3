package com.area.app.model;

public class Arg {
    private String method;
    private String placeholder;
    private String type;

    public Arg() {
        
    }

    public Arg(String method, String placeholder, String type) {
        this.method = method;
        this.placeholder = placeholder;
        this.type = type;
    }

    public String getMethod() {
        return this.method;
    }

    public String getPlaceholder() {
        return this.placeholder;
    }

    public String getType() {
        return this.type;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public void setPlaceholder(String placeholder) {
        this.placeholder = placeholder;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "{" +
            "method='" + this.method + '\'' +
            ",placeholder='" + this.placeholder + '\'' +
            ",type='" + this.type + '\'' +
        "}";
    }
}
