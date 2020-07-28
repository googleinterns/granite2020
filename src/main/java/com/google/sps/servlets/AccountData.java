package com.google.sps.servlets;

import java.io.IOException;
import com.google.gson.Gson;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/account")
public class AccountData extends HttpServlet {


  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    UserService userService=UserServiceFactory.getUserService();

    String link;

    if (userService.isUserLoggedIn()){
      link = userService.createLogoutURL("/index.html");

    }
    else{
      link = userService.createLoginURL("/index.html");

    }

    response.setContentType("application/json");
    response.getWriter().println(convertToJsonUsingGson(link));


  }


  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
      UserService userService = UserServiceFactory.getUserService();
      Entity userEntity = new Entity("User");

      UserData userData = new UserData(request.getParameter("first-name"), request.getParameter("last-name"));
      userEntity.setProperty("user-info", userData);
      userEntity.setProperty("email",userService.getCurrentUser().getEmail());

      DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
      datastore.put(userEntity);

      response.sendRedirect("/index.html");
  }

  private String convertToJsonUsingGson(String comments) {
    Gson gson = new Gson();
    String json = gson.toJson(comments);
    return json;
  }



}