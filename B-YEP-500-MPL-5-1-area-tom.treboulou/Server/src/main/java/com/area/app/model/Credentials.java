package com.area.app.model;

public class Credentials {
    private String username;
    private String password;
    private String mail;

    public Credentials() {
    }

    public Credentials(String username, String password, String mail)
    {
        this.username = username;
        this.password = password;
        this.mail = mail;
    }

    public String getUsername()
    {
        return this.username;
    }

    public String getPassword()
    {
        return this.password;
    }

    public String getMail()
    {
        return this.mail;
    }

    public void setUsername(String username)
    {
        this.username = username;
    }

    public void setPassword(String password)
    {
        this.password = password;
    }
    
    public void setMail(String mail)
    {
        this.mail = mail;
    }
}