package com.area.app.model;

public class TwitterCodeBody {
    private String oauth_verifier;
    private String oauth_token;
    private String email;

    public TwitterCodeBody() {

    }

    public TwitterCodeBody(String oauth_verifier, String oauth_token, String email) {
        this.oauth_verifier = oauth_verifier;
        this.oauth_token = oauth_token; 
        this.email = email;
    }

    public String getOauthVerifier() {
        return this.oauth_verifier;
    }

    public String getOauthToken() {
        return this.oauth_token;
    }

    public String getEmail() {
        return this.email;
    }

    public void setOauthVerifier(String oauth_verifier) {
        this.oauth_verifier = oauth_verifier;
    } 

    public void setOauthToken(String oauth_token) {
        this.oauth_token = oauth_token;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "{" +
            "oauth_verifier='" + this.oauth_verifier + '\'' +
            ",oauth_token='" + this.oauth_token + '\'' +
            ",email='" + this.email + '\'' +
        "}";
    }
}
