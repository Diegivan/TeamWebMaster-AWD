/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ec.edu.espe.fastsplash.model;

/**
 *
 * @author Fernando
 */
public class User {
   private String names;
  private  String lastNames;
   private String username;
   private String password;
  private  String identification;
   private String adress;
   private String email;

    public User(String names, String lastNames, String username, String password, String identification, String adress, String email) {
        this.names = names;
        this.lastNames = lastNames;
        this.username = username;
        this.password = password;
        this.identification = identification;
        this.adress = adress;
        this.email = email;
    }

    public User() {
    }

    public String getNames() {
        return names;
    }

    public void setNames(String names) {
        this.names = names;
    }

    public String getLastNames() {
        return lastNames;
    }

    public void setLastNames(String lastNames) {
        this.lastNames = lastNames;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getIdentification() {
        return identification;
    }

    public void setIdentification(String identification) {
        this.identification = identification;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
     @Override
    public String toString() {
        return this.username;
    }
    
}
