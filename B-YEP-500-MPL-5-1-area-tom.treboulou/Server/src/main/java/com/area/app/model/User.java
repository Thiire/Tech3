package com.area.app.model;

import com.google.firebase.auth.UserRecord;
import com.google.firebase.auth.FirebaseToken;

public class User extends Data {
    private String _uid;
    private String _name;
    private String _email;
    private String _phoneNumber;
    private Boolean _verified;
    private String _photoUrl;

    public User() {

    }

    public User(UserRecord user) {
        this._uid = user.getUid();
        this._name = user.getDisplayName();
        this._email = user.getEmail();
        this._phoneNumber = user.getPhoneNumber();
        this._verified = user.isEmailVerified();
        this._photoUrl = user.getPhotoUrl();
    }

    public User(FirebaseToken token)
    {
        this._uid = token.getUid();
        this._name = token.getName();
        this._email = token.getEmail();
        this._phoneNumber = null;
        this._verified = token.isEmailVerified();
        this._photoUrl = token.getPicture();
    }

    public String getUid() {
        return this._uid;
    }

    public String getName() {
        return this._name;
    }

    public String getEmail() {
        return this._email;
    }

    public String getPhoneNumber() {
        return this._phoneNumber;
    }

    public Boolean isEmailVerified() {
        return this._verified;
    }

    public String getPhotoUrl() {
        return this._photoUrl;
    }

    public void setUid(String uid) {
        this._uid = uid;
    }

    public void setName(String name) {
        this._name = name;
    }
    public void setEmail(String email) {
        this._email = email;
    }

    public void getPhoneNumber(String phoneNumber) {
        this._phoneNumber = phoneNumber;
    }

    public void isEmailVerified(Boolean verified) {
        this._verified = verified;
    }

    public void getPhotoUrl(String photoUrl) {
        this._photoUrl = photoUrl;
    }

    @Override
    public String toString() {
        return "data={" +
            "uid=" + this._uid +
            ",name='" + this._name + '\'' +
            ",email='" + this._email + '\'' +
            ",phone_number='" + this._phoneNumber + '\'' +
            ",verified='" + this._verified.toString() + '\'' +
            ",photo_url='" + this._photoUrl + '\'' +
        "}";
    }
}
