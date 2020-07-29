package com.google.sps.servlets;


public class UserData{
    private String firstName;
    private String lastName;
    private String email;
    public UserData (String firstName, String lastName, String email){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public String getFirstName(){
        return firstName;
    }
    public String getLastName(){
        return lastName;
    }
    public String email(){
        return email;
    }
}