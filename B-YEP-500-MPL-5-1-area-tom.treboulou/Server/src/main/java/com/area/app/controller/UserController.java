package com.area.app.controller;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import com.area.app.model.AreaError;
import com.area.app.model.Credentials;
import com.area.app.model.ResponseModel;
import com.area.app.model.User;
import com.area.app.model.UserInfos;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @RequestMapping(value="/login", method=RequestMethod.GET)
    public ResponseModel loginUser(@RequestParam("id_token") String idToken)
    {
        FirebaseAuth auth = FirebaseAuth.getInstance();

        User currentUser = null;
        try {
            FirebaseToken token = auth.verifyIdToken(idToken);
            currentUser = new User(token);
            return new ResponseModel(currentUser, true, 200);
        } catch (FirebaseAuthException e) {
            return new ResponseModel(new AreaError(e.getMessage()), false, 400);
        }
    }

    @RequestMapping(value="/signUp", method=RequestMethod.POST)
    public ResponseModel signInUser(@RequestBody Credentials credentials)
    {
        FirebaseAuth auth = FirebaseAuth.getInstance();
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference ref = database.getReference("Users");
        User currentUser = null;

        try {
            auth.getUserByEmail(credentials.getMail());
            return new ResponseModel(new AreaError("User already exists !"), false, 401);
        } catch (FirebaseAuthException exc) {
            try {
                currentUser = new User(auth.createUser(new UserRecord.CreateRequest()
                .setEmail(credentials.getMail())
                .setEmailVerified(false)
                .setPassword(credentials.getPassword())
                .setDisplayName(credentials.getUsername())
                ));
                ref.push().setValueAsync(new UserInfos(credentials.getMail(), null, null));
                auth.generateEmailVerificationLink(credentials.getMail());
                return new ResponseModel(currentUser, true, 200);
            } catch (FirebaseAuthException e) {
                return new ResponseModel(new AreaError(e.getMessage()), false, 400);
            }
        } catch (IllegalArgumentException exc) {
            return new ResponseModel(new AreaError(exc.getMessage()), false, 400);
        }
    }
}