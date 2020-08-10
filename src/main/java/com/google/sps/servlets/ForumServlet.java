package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.gson.Gson;
import com.google.sps.data.ForumElement;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that handles forum data (questions, comments, and replies) */
@WebServlet("/forum")
public class ForumServlet extends HttpServlet {
  private static final String ID_PROPERTY = "id";
  private static final String PARENT_ID_PROPERTY = "parentId";
  private static final String TOPIC_PROPERTY = "topic";
  private static final String TEXT_PROPERTY = "text";
  private static final String TIMESTAMP_PROPERTY = "timestamp";
  private static final String LIKES_PROPERTY = "likes";

  /** Get request to the Datastore and responds with the forum elements with the id input */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    long id = Long.parseLong(request.getParameter(ID_PROPERTY));
    List<ForumElement> elements = getForumElements(id);
    Gson gson = new Gson();
    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(elements));
  }

  /**
   * Post request to the Datastore that posts a new element or increments the likes of an element
   */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    long id = Long.parseLong(request.getParameter(ID_PROPERTY));
    String likes = request.getParameter(LIKES_PROPERTY);

    if (likes.equals("true")) {
      /* Increments likes of element */
      incrementLikes(id);
      response.sendRedirect("/forum.html");
    } else {
      /* Adds new forum element */
      String topic = "none";
      if (id == -1) {
        topic = request.getParameter(TOPIC_PROPERTY);
      }
      String text = request.getParameter(TEXT_PROPERTY);
      addForumEntity(id, topic, text);
      response.sendRedirect("/forum.html");
    }
  }

  /** Gets a list of forum elements from Datastore with id given */
  private List<ForumElement> getForumElements(long id) {
    Filter filter = new FilterPredicate(PARENT_ID_PROPERTY, FilterOperator.EQUAL, id);
    Query query = new Query("ForumElement").setFilter(filter);
    // TODO: Add sort of likes descending
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<ForumElement> elements = new ArrayList<>();
    for (Entity entity : results.asIterable()) {
      elements.add(ForumElement.createWithEntity(entity));
    }
    return elements;
  }

  /** Increments likes of element given id in Datastore */
  private void incrementLikes(long id) {
    Key key = KeyFactory.createKey("ForumElement", id);
    Filter filter = new FilterPredicate(Entity.KEY_RESERVED_PROPERTY, FilterOperator.EQUAL, key);
    Query query = new Query("ForumElement").setFilter(filter);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    for (Entity entity : results.asIterable()) {
      long likes = (long) entity.getProperty(LIKES_PROPERTY);
      entity.setProperty(LIKES_PROPERTY, likes + 1);
      datastore.put(entity);
    }
  }

  /** Creates new entitiy given parentId, topic, and text and stores in Datastore */
  private void addForumEntity(long parentId, String topic, String text) {
    Entity forumEntity = new Entity("ForumElement");
    forumEntity.setProperty(PARENT_ID_PROPERTY, parentId);
    forumEntity.setProperty(TOPIC_PROPERTY, topic);
    long timestamp = System.currentTimeMillis();
    forumEntity.setProperty(TIMESTAMP_PROPERTY, timestamp);
    forumEntity.setProperty(LIKES_PROPERTY, 0);
    forumEntity.setProperty(TEXT_PROPERTY, text);
    // TODO: Include User data

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(forumEntity);
  }
}
