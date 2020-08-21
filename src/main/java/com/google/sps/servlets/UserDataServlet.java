package com.google.sps.servlets;

import com.google.api.client.extensions.appengine.http.UrlFetchTransport;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.json.gson.GsonFactory;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.google.sps.data.ForumElement;
import java.io.*;
import java.lang.reflect.Type;
import java.util.Collections;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Collections;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that handles forum data (questions, comments, and replies) */
@WebServlet("/account")
public class UserDataServlet extends HttpServlet {
  private static final String ID_PROPERTY = "id";
  private static final String NAME_PROPERTY = "name";
  private static final String EMAIL_PROPERTY = "email";
  private static final String LIKED_PROPERTY = "liked";
  private static final String COMMENT_PROPERTY = "comments";
  private static final String IMAGE_PROPERTY = "image";
  private static final String DATASTORE_USER = "User";
  private static final String ACTION_PROPERTY = "action";
  private static final String NEW_ACCOUNT_PROPERTY = "newAccount";
  private static final String ELEMENT_ID_PROPERTY = "elementId";

  private String userId = "";

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String action = request.getParameter(ACTION_PROPERTY);
    String id = request.getParameter(ID_PROPERTY);
    Entity entity = getUserEntity(id);

    if (action.equals(NAME_PROPERTY)) {
      response.setContentType("text/plain");
      response.getWriter().println((String) entity.getProperty(NAME_PROPERTY));
    }

    if (action.equals(LIKED_PROPERTY)) {
      response.setContentType("application/json;");
      response.getWriter().println((String) entity.getProperty(LIKED_PROPERTY));
    }
    
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String action = request.getParameter(ACTION_PROPERTY);

    if (action.equals(LIKED_PROPERTY)) {
      DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
      String id = request.getParameter(ID_PROPERTY);
      String elementId = request.getParameter(ELEMENT_ID_PROPERTY);
      Entity entity = getUserEntity(id);
      String json = (String) entity.getProperty(LIKED_PROPERTY);
      ArrayList<String> liked = convertToArrayList(json);
      liked.add(elementId);
      String newJson = convertToJson(liked);
      entity.setProperty(LIKED_PROPERTY, newJson);
      datastore.put(entity);
    }


    if (action.equals(NEW_ACCOUNT_PROPERTY)) {
      String idTokenString = request.getParameter("idtoken");
      UrlFetchTransport transport = new UrlFetchTransport();

      GsonFactory gsonFactory = new GsonFactory();

      GoogleIdTokenVerifier verifier =
          new GoogleIdTokenVerifier.Builder(UrlFetchTransport.getDefaultInstance(), gsonFactory)
              .setAudience(
                  Collections.singletonList(
                      "757099697912-i6jll98mfgochdo2vgjcovf64pepjesc.apps.googleusercontent.com"))
              .build();

      GoogleIdToken idToken;
      try {
        idToken = verifier.verify(idTokenString);
      } catch (GeneralSecurityException e) {
        idToken = null;
      }
      if (idToken != null) {
        Payload payload = idToken.getPayload();

        userId = payload.getSubject();
        String email = payload.getEmail();
        String name = (String) payload.get("name");
        String pictureUrl = (String) payload.get("picture");
        String locale = (String) payload.get("locale");
        String familyName = (String) payload.get("family_name");
        String givenName = (String) payload.get("given_name");

        Entity user = getUserEntity(userId);
        if (user == null) {
          addUser(userId, name, email, pictureUrl);
        }
      } else {
        System.out.println("Invalid ID token.");
      }
    }
  }

  private Entity getUserEntity(String id) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query query =
        new Query("User")
            .setFilter(new Query.FilterPredicate(ID_PROPERTY, Query.FilterOperator.EQUAL, id));
    PreparedQuery results = datastore.prepare(query);

    Entity entity = results.asSingleEntity();

    return entity;
  }

  private void addUser(String id, String name, String email, String pictureUrl) {
    Entity userEntity = new Entity(DATASTORE_USER);

    userEntity.setProperty(ID_PROPERTY, id);
    userEntity.setProperty(NAME_PROPERTY, name);
    userEntity.setProperty(EMAIL_PROPERTY, email);
    userEntity.setProperty(LIKED_PROPERTY, convertToJson(new ArrayList<String>()));
    userEntity.setProperty(COMMENT_PROPERTY, convertToJson(new ArrayList<String>()));
    userEntity.setProperty(IMAGE_PROPERTY, pictureUrl);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(userEntity);
  }

  private String convertToJson(ArrayList<String> arrayList) {
    Gson gson = new Gson();
    String json = gson.toJson(arrayList);
    return json;
  }

  private ArrayList<String> convertToArrayList(String json) {
    Gson gson = new Gson();
    Type listType = new TypeToken<ArrayList<String>>(){}.getType();
    ArrayList<String> liked = gson.fromJson(json, listType);
    return liked;
  }
}
