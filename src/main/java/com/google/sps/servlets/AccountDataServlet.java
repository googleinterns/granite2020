package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.Gson;
import java.io.IOException;
import java.util.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns all account related info (links to login pages/account info). */
@WebServlet("/account")
public class AccountDataServlet extends HttpServlet {
  private final String idProperty = "id";

  private static final class JsonAccountInfo {
    private final boolean loggedIn;
    private final String logInOutURL;
    private final String signUpURL;
    private final UserInfo userInfo;
    private static final UserInfo INVALID_USER =
        new UserInfo("This", "account", "doesn't", "exist");

    public JsonAccountInfo(
        Boolean loggedIn, String logInOutURL, String signUpURL, UserInfo userInfo) {
      this.loggedIn = loggedIn;
      this.logInOutURL = logInOutURL;
      this.signUpURL = signUpURL;
      this.userInfo = userInfo;
    }

    public static JsonAccountInfo loggedInFactory(String logInURL, UserInfo userInfo) {
      return new JsonAccountInfo(true, logInURL, "", userInfo);
    }

    public static JsonAccountInfo loggedOutFactory(String logOutURL, String signUpURL) {
      return new JsonAccountInfo(false, logOutURL, signUpURL, (UserInfo) null);
    }

    public boolean getLoggedIn() {
      return loggedIn;
    }

    public String getLogInOutURL() {
      return logInOutURL;
    }

    /**
     * @return login URL redirecting to signup.html if user is logged out, empty string otherwise
     */
    public String getSignUpURL() {
      return signUpURL;
    }

    /** @return UserInfo object relating to logged in user if logged in,null otherwise. */
    public UserInfo getUserInfo() {
      return userInfo;
    }
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    UserService userService = UserServiceFactory.getUserService();

    JsonAccountInfo jsonAccountInfo;

    if (userService.isUserLoggedIn()) {
      String logInOutLink = userService.createLogoutURL("/index.html");

      Entity userEntity = getUserEntity(userService.getCurrentUser().getUserId());
      UserInfo userInfo;
      if (userEntity == null) {
        userInfo = JsonAccountInfo.INVALID_USER;
      } else {
        userInfo =
            new UserInfo(
                (String) userEntity.getProperty("email"),
                (String) userEntity.getProperty(idProperty),
                (String) userEntity.getProperty("first-name"),
                (String) userEntity.getProperty("last-name"));
      }

      jsonAccountInfo = JsonAccountInfo.loggedInFactory(logInOutLink, userInfo);
    } else {

      String logInOutLink = userService.createLoginURL("/index.html");
      String signUpLink = userService.createLoginURL("/signup.html");
      jsonAccountInfo = JsonAccountInfo.loggedOutFactory(logInOutLink, signUpLink);
    }

    response.setContentType("application/json");
    response.getWriter().println(convertToJsonUsingGson(jsonAccountInfo));
  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();
    Entity userEntity = new Entity("User");

    // adds data to userentity
    userEntity.setProperty(idProperty, userService.getCurrentUser().getUserId());
    userEntity.setProperty("first-name", request.getParameter("first-name"));
    userEntity.setProperty("last-name", request.getParameter("last-name"));
    userEntity.setProperty("email", userService.getCurrentUser().getEmail());

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(userEntity);

    response.sendRedirect("/index.html");
  }

  private String convertToJsonUsingGson(JsonAccountInfo jsonAccountInfo) {
    Gson gson = new Gson();
    String json = gson.toJson(jsonAccountInfo);
    return json;
  }

  private Entity getUserEntity(String id) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query query =
        new Query("User")
            .setFilter(new Query.FilterPredicate(idProperty, Query.FilterOperator.EQUAL, id));
    PreparedQuery results = datastore.prepare(query);

    Entity entity = results.asSingleEntity();

    return entity;
  }
}
