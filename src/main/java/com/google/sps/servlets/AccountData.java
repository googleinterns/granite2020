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

  public final class JsonHelper{
        private final boolean loggedIn;
        private final String logInOutURL;
        public JsonHelper(Boolean loggedIn, String logInOutURL){
            this.loggedIn=loggedIn;
            this.logInOutURL=logInOutURL;
          }
        public boolean getLoggedIn(){
            return loggedIn;
        }
        public String getLogInOutURL(){
            return logInOutURL;
        }
    }



  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    UserService userService=UserServiceFactory.getUserService();

    String link;
    JsonHelper jsonHelper;

    if (userService.isUserLoggedIn()){
      link = userService.createLogoutURL("/index.html");

      jsonHelper=new JsonHelper(true, link);


    }
    else{
      link = userService.createLoginURL("/index.html");

      jsonHelper = new JsonHelper(false, link);

    }

    response.setContentType("application/json");
    response.getWriter().println(convertToJsonUsingGson(jsonHelper));


  }


  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
      UserService userService = UserServiceFactory.getUserService();
      Entity userEntity = new Entity("User");



      //adds data to userentity
      userEntity.setProperty("id",userService.getCurrentUser().getUserId());
      userEntity.setProperty("first-name", request.getParameter("first-name"));
      userEntity.setProperty("last-name", request.getParameter("last-name"));
      userEntity.setProperty("email", userService.getCurrentUser().getEmail());


      DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
      datastore.put(userEntity);

      response.sendRedirect("/index.html");
  }

  private String convertToJsonUsingGson(JsonHelper jsonHelper) {
    Gson gson = new Gson();
    String json = gson.toJson(jsonHelper);
    return json;
  }


  // private UserData getUserData(String id){
  //   DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
  //   Query query = new Query("UserInfo").setFilter(new Query.FilterPredicate("id", Query.FilterOperator.EQUAL, id));
  //   PreparedQuery results = datastore.prepare(query);

  //   Entity entity = results.asSingleEntity();
  //   if (entity == null) {
  //     return null;
  //   }
  //   UserData userData = (UserData) entity.getProperty("user-info");
  //   return userData;
  // }


}