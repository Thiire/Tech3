package com.area.app.model;

public class AreaError extends Data {
    private String _message;

    public AreaError() {

    }

    public AreaError(String message) {
        this._message = message;
    }

    public String getMessage() {
        return this._message;
    }

    public void setMessage(String message) {
        this._message = message;
    }

    public String toString() {
        return "{" +
            "message=" + this._message +
        "}";
    }
}
