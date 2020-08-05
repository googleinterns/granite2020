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

  /** Get request to the Datastore and responds with the forum elements with the parentId input */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    long parentId = Long.parseLong(request.getParameter("parentId"));
    List elements = getForumElements(parentId);
    Gson gson = new Gson();
    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(elements));
  }

  /**
   * Post request to the Datastore that posts a new element or increments the likes of an element
   */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String like = request.getParameter("like");

    if (like.equals("true")) {
      /* Increments likes of element */
      long id = Long.parseLong(request.getParameter("id"));
      incrementLikes(id);
      response.sendRedirect("/forum.html");
    } else {
      /* Adds new forum element */
      long parentId = Long.parseLong(request.getParameter("parentId"));
      String topic = "none";
      if (parentId == -1) {
        topic = request.getParameter("topic-input");
      }
      String text = request.getParameter("text-input");
      addForumEntity(parentId, topic, text);
      response.sendRedirect("/forum.html");
    }
  }

  /** Gets a list of forum elements from Datastore with parentId given */
  private List getForumElements(long parentId) {
    Filter filter = new FilterPredicate("parentId", FilterOperator.EQUAL, parentId);
    Query query = new Query("ForumElement").setFilter(filter);
    // TODO: Add sort of likes descending
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<ForumElement> elements = new ArrayList<>();
    for (Entity entity : results.asIterable()) {
      elements.add(convertEntityToForumElement(entity));
    }
    return elements;
  }

  /** Inputs an entity and returns a new forum element using the fields of the entity */
  private ForumElement convertEntityToForumElement(Entity entity) {
    long id = entity.getKey().getId();
    long parentId = (long) entity.getProperty("parentId");
    String topic = (String) entity.getProperty("topic");
    long timestamp = (long) entity.getProperty("timestamp");
    long likes = (long) entity.getProperty("likes");
    String text = (String) entity.getProperty("text");
    // TODO: Get user information

    ForumElement element = new ForumElement(id, parentId, topic, timestamp, likes, text);
    return element;
  }

  /** Increments likes of element given id in Datastore */
  private void incrementLikes(long id) {
    Key key = KeyFactory.createKey("ForumElement", id);
    Filter filter = new FilterPredicate(Entity.KEY_RESERVED_PROPERTY, FilterOperator.EQUAL, key);
    Query query = new Query("ForumElement").setFilter(filter);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    for (Entity entity : results.asIterable()) {
      long likes = (long) entity.getProperty("likes");
      entity.setProperty("likes", likes + 1);
      datastore.put(entity);
    }
  }

  /** Creates new entitiy given parentId, topic, and text and stores in Datastore */
  private void addForumEntity(long parentId, String topic, String text) {
    Entity forumEntity = new Entity("ForumElement");
    forumEntity.setProperty("parentId", parentId);
    forumEntity.setProperty("topic", topic);
    long timestamp = System.currentTimeMillis();
    forumEntity.setProperty("timestamp", timestamp);
    forumEntity.setProperty("likes", 0);
    forumEntity.setProperty("text", text);
    // TODO: Include User data

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(forumEntity);
  }
}
