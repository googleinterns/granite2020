package com.google.sps.servlets;

public final class UserInfo {
  private final String email;
  private final String id;
  private final String firstName;
  private final String lastName;

  public UserInfo(String email, String id, String firstName, String lastName) {
    this.email = email;
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public String getEmail() {
    return email;
  }

  public String getId() {
    return id;
  }

  public String getFirstName() {
    return firstName;
  }

  public String getLastName() {
    return lastName; 
  }
}
