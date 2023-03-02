package com.area.app.controller;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CountDownLatch;

import com.area.app.model.*;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServiceController {
    @RequestMapping(value = "/addService", method = RequestMethod.POST)
    public ResponseModel addService(@RequestBody ServiceName service) {
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference ref = database.getReference("Services");

        ref.push().setValueAsync(new Service(null, null, service.getName()));

        return new ResponseModel(null, true, 200);
    }

    @RequestMapping(value = "/addAction", method = RequestMethod.POST)
    public ResponseModel addService(@RequestBody Action action) {
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference ref = database.getReference("Services");

        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot data) {
                for (DataSnapshot child : data.getChildren()) {
                    String service = child.child("name").getValue(String.class);
                    if (action.getNetwork().compareTo(service) == 0) {
                        DatabaseReference actRef = ref.child(child.getKey() + "/actions");
                        actRef.push().setValueAsync(action);
                    }
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {

            }
        });
        return new ResponseModel(null, true, 200);
    }

    @RequestMapping(value = "/addReaction", method = RequestMethod.POST)
    public ResponseModel addService(@RequestBody Reaction reaction) {
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference ref = database.getReference("Services");

        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot data) {
                for (DataSnapshot child : data.getChildren()) {
                    String service = child.child("name").getValue(String.class);
                    if (reaction.getNetwork().compareTo(service) == 0) {
                        DatabaseReference reacRef = ref.child(child.getKey() + "/reactions");
                        reacRef.push().setValueAsync(reaction);
                    }
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {

            }
        });
        return new ResponseModel(null, true, 200);
    }

    @RequestMapping(value = "/addArea", method = RequestMethod.POST)
    public ResponseModel addReaction(@RequestHeader("email") String email, @RequestBody Area area) {
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference ref = database.getReference("Users");

        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot data) {
                for (DataSnapshot child : data.getChildren()) {
                    String user = child.child("email").getValue(String.class);
                    if (user.compareTo(email) == 0) {
                        DatabaseReference areaRef = ref.child(child.getKey() + "/areas");
                        areaRef.push().setValueAsync(area);
                    }
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {

            }
        });
        return new ResponseModel(null, true, 200);
    }

    @RequestMapping(value = "/addUserService", method = RequestMethod.POST)
    public ResponseModel addUserService(@RequestHeader("email") String email, @RequestBody UserService service) {
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference ref = database.getReference("Users");

        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot data) {
                for (DataSnapshot child : data.getChildren()) {
                    String user = child.child("email").getValue(String.class);
                    if (user.compareTo(email) == 0) {
                        DatabaseReference serviceRef = ref.child(child.getKey() + "/services");
                        serviceRef.push().setValueAsync(service);
                    }
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {

            }
        });
        return new ResponseModel(null, true, 200);
    }

    @RequestMapping(value = "/services", method = RequestMethod.GET)
    public List<Service> getServices() {
        List<Service> services = new ArrayList<Service>();
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference ref = database.getReference("Services");
        CountDownLatch done = new CountDownLatch(1);

        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot data) {
                for (DataSnapshot child : data.getChildren()) {
                    Service service = new Service();
                    List<Action> actions = new ArrayList<Action>();
                    List<Reaction> reactions = new ArrayList<Reaction>();
                    service.setName(child.child("name").getValue(String.class));
                    for (DataSnapshot actChild : child.child("actions").getChildren()) {
                        actions.add(actChild.getValue(Action.class));
                    }
                    service.setActions(actions);
                    for (DataSnapshot actChild : child.child("reactions").getChildren()) {
                        reactions.add(actChild.getValue(Reaction.class));
                    }
                    service.setReactions(reactions);
                    services.add(service);
                }
                done.countDown();
            }

            @Override
            public void onCancelled(DatabaseError error) {
                System.out.println(error.getMessage());
                done.countDown();
            }
        });

        try {
            done.await();
        } catch (InterruptedException e) {
            return null;
        }
        return services;
    }

    @RequestMapping(value = "/userAreas", method = RequestMethod.GET)
    public List<Area> getUserAreas(@RequestHeader("email") String email) {
        System.out.println("In Areas");
        List<Area> areas = new ArrayList<Area>();
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference ref = database.getReference("Users");
        CountDownLatch done = new CountDownLatch(1);

        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot data) {
                for (DataSnapshot child : data.getChildren()) {
                    String user = child.child("email").getValue(String.class);
                    if (user.compareTo(email) == 0) {
                        for (DataSnapshot areChild : child.child("areas").getChildren()) {
                            areas.add(areChild.getValue(Area.class));
                        }
                    }
                }
                done.countDown();
            }

            @Override
            public void onCancelled(DatabaseError error) {
                System.out.println(error.getMessage());
                done.countDown();
            }
        });

        try {
            done.await();
        } catch (InterruptedException e) {
            return null;
        }
        System.out.println(areas);
        return areas;
    }

    @RequestMapping(value = "/userServices", method = RequestMethod.GET)
    public List<UserService> getUserServices(@RequestHeader("email") String email) {
        List<UserService> services = new ArrayList<UserService>();
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference ref = database.getReference("Users");
        CountDownLatch done = new CountDownLatch(1);

        ref.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot data) {
                for (DataSnapshot child : data.getChildren()) {
                    String user = child.child("email").getValue(String.class);
                    if (user.compareTo(email) == 0) {
                        for (DataSnapshot areChild : child.child("services").getChildren()) {
                            services.add(areChild.getValue(UserService.class));
                        }
                    }
                }
                done.countDown();
            }

            @Override
            public void onCancelled(DatabaseError error) {
                System.out.println(error.getMessage());
                done.countDown();
            }
        });

        try {
            done.await();
        } catch (InterruptedException e) {
            return null;
        }
        return services;
    }
}
