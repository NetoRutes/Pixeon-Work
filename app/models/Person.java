package models;

import com.avaje.ebean.Model;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Person extends Model {
    @Id
    public String id;
    public String name;
    public String img;

    public Person(String name, String img){
        this.name = name;
        this.img = img;
    }
}
