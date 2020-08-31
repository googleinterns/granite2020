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
import java.io.*;
import java.lang.reflect.Type;
import java.util.ArrayList;
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
  private static final String ID_TOKEN_PROPERTY = "idtoken";

  private static final String CLIENT_ID =
      "757099697912-i6jll98mfgochdo2vgjcovf64pepjesc.apps.googleusercontent.com";

  private String userId = "";

  /** Get request to the Datastore and responds with user property given the id input */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String action = request.getParameter(ACTION_PROPERTY);
    String userId = request.getParameter(ID_PROPERTY);

    Entity entity = getUserEntity(userId);

    if (action.equals(NAME_PROPERTY)) {
      // Get user name based on id
      response.setContentType("application/json;");
      Gson gson = new Gson();
      String name = (String) entity.getProperty(NAME_PROPERTY);
      response.getWriter().println(gson.toJson(name));
    }

    if (action.equals(LIKED_PROPERTY)) {
      // Get user likes based on id
      response.setContentType("application/json;");
      String liked = (String) entity.getProperty(LIKED_PROPERTY);
      response.getWriter().println(liked);
    }
  }

  /** Post request to the Datastore to post new user or update likes */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String action = request.getParameter(ACTION_PROPERTY);

    if (action.equals(LIKED_PROPERTY)) {
      // Adds to user likes
      String elementId = request.getParameter(ELEMENT_ID_PROPERTY);
      String userId = request.getParameter(ID_PROPERTY);
      Entity entity = getUserEntity(userId);

      String json = (String) entity.getProperty(LIKED_PROPERTY);
      ArrayList<String> liked = convertToArrayList(json);
      liked.add(elementId);
      String newJson = convertToJson(liked);
      entity.setProperty(LIKED_PROPERTY, newJson);

      DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
      datastore.put(entity);
    }

    if (action.equals(NEW_ACCOUNT_PROPERTY)) {
      // Adds new user account
      String idTokenString = request.getParameter(ID_TOKEN_PROPERTY);
      GoogleIdToken idToken = getGoogleIdToken(idTokenString);
      if (idToken != null) {
        Payload payload = idToken.getPayload();
        String userId = payload.getSubject();
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
        System.out.println("Invalid ID token for POST.");
      }
    }
  }

  /** Gets Google Id Token based on idtoken string */
  private GoogleIdToken getGoogleIdToken(String idTokenString) {
    UrlFetchTransport transport = new UrlFetchTransport();
    GsonFactory gsonFactory = new GsonFactory();

    GoogleIdTokenVerifier verifier =
        new GoogleIdTokenVerifier.Builder(UrlFetchTransport.getDefaultInstance(), gsonFactory)
            .setAudience(Collections.singletonList(CLIENT_ID))
            .build();

    GoogleIdToken idToken;

    try {
      idToken = verifier.verify(idTokenString);
    } catch (Exception e) {
      idToken = null;
    }

    return idToken;
  }

  /** Gets user entity based on user id */
  private Entity getUserEntity(String id) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Query query =
        new Query(DATASTORE_USER)
            .setFilter(new Query.FilterPredicate(ID_PROPERTY, Query.FilterOperator.EQUAL, id));
    PreparedQuery results = datastore.prepare(query);

    Entity entity = results.asSingleEntity();

    return entity;
  }

  /** Adds user to datastore based on properties */
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

  /** Convert arrayList to Json */
  private String convertToJson(ArrayList<String> arrayList) {
    Gson gson = new Gson();
    String json = gson.toJson(arrayList);
    return json;
  }

  /** Convert Json to arrayList */
  private ArrayList<String> convertToArrayList(String json) {
    Gson gson = new Gson();
    Type listType = new TypeToken<ArrayList<String>>() {}.getType();
    ArrayList<String> liked = gson.fromJson(json, listType);
    return liked;
  }
}
