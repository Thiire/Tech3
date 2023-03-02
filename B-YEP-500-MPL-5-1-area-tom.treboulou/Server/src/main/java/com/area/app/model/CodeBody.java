package com.area.app.model;

public class CodeBody {
    private String code;
    private String email;

    public CodeBody() {

    }

    public CodeBody(String code, String email) {
        this.code = code;
        this.email = email;
    }

    public String getCode() {
        return this.code;
    }

    public String getEmail() {
        return this.email;
    }

    public void setCode(String code) {
        this.code = code;
    } 

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "{" +
            "code='" + this.code + '\'' +
            ",email='" + this.email + '\'' +
        "}";
    }
}
