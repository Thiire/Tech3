package com.area.app.model;

public class ListParams {
    private String label;
    private String value;

    public ListParams() {

    }

    public ListParams(String label, String value) {
        this.label = label;
        this.value = value;
    }

    public String getLabel() {
        return this.label;
    }

    public String getValue() {
        return this.value;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "{" +
            "label='" + this.label + '\'' +
            ",value='" + this.value + '\'' +
        "}";
    }
}