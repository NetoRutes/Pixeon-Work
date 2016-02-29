package controllers;


import com.fasterxml.jackson.databind.JsonNode;
import play.Logger;
import models.Person;
import play.data.Form;
import play.libs.EventSource;
import play.mvc.*;
import views.html.index;
import com.avaje.ebean.Model;
import java.util.*;

import static play.libs.Json.toJson;

public class Application extends Controller {

    private static List<EventSource> sockets = new ArrayList<EventSource>();

    public Result index() {
        return ok(index.render("Chat Pixeon"));
    }

    public Result addPerson(){
        //Person person = Form.form(Person.class).bindFromRequest().get();
        JsonNode msg = request().body().asJson();
        if(!isOnline(msg.findPath("name").textValue())){
            Person person = new Person(msg.findPath("name").textValue(), msg.findPath("img").textValue());
            person.save();

        }
        return redirect(routes.Application.index());
    }

    private boolean isOnline(String name){
        List<Person> persons = new Model.Finder(Person.class).all();
        Person p;
        for(int i=0; i<persons.size();i++){
            p = persons.get(i);
            if(p.name.equals(name)){
                return true;
            }
        }
        return false;
    }

    public Result getPersons(){
        List<Person> persons = new Model.Finder(Person.class).all();
        return ok(toJson(persons));

    }

    public Result postMsg(){
        JsonNode msg = request().body().asJson();
        sockets.stream().forEach(es -> es.send(EventSource.Event.event(msg)));
        return ok();
    }

    public Result chatFeed() {
        String remoteAddress = request().remoteAddress();
        Logger.info(remoteAddress + " - SSE conntected");

        return ok(new EventSource() {
            @Override
            public void onConnected() {
                EventSource currentSocket = this;

                this.onDisconnected(() -> {
                    Logger.info(remoteAddress + " - SSE disconntected");
                  /*  for(int i=0; i<sockets.size();i++){
                        if(sockets.get(i).equals(currentSocket)){
                            sockets.remove(i);
                        }
                    }*/
                });

                // Add socket to room
                sockets.add(currentSocket);
            }
        });
    }
}
