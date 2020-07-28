package com.google.sps.servlets;


public class UserData{
    private String firstName;
    private String lastName;
    public UserData (String firstName, String lastName){
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public String getFirstName(){
        return firstName;
    }
    public String getLastName(){
        return lastName;
    }

}