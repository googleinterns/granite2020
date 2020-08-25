package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.CompositeFilter;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;
import com.google.sps.data.ForumElement;
import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that handles forum data (questions, comments, and replies) */
@WebServlet("/forum")
public class ForumServlet extends HttpServlet {
  public static final String ACTION_PROPERTY = "action";
  public static final String REPLY_PROPERTY = "reply";
  public static final String FILTER_PROPERTY = "filter";
  public static final String SORT_PROPERTY = "sort";

  /* Saved fields of the filters for questions */
  private String topicFilter = "all";
  private String sortFilter = ForumElement.TIMESTAMP_PROPERTY;

  /** Get request to the Datastore and responds with the forum elements with the id input */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    long id = Long.parseLong(request.getParameter(ForumElement.ID_PROPERTY));
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
    String action = request.getParameter(ACTION_PROPERTY);

    if (action.equals(ForumElement.LIKES_PROPERTY)) {
      /* Increments likes of element */
      long id = Long.parseLong(request.getParameter(ForumElement.ID_PROPERTY));
      incrementProperty(ForumElement.LIKES_PROPERTY, id);
    }

    if (action.equals(REPLY_PROPERTY)) {
      /* Adds new forum element */
      long id = Long.parseLong(request.getParameter(ForumElement.ID_PROPERTY));
      String userId = request.getParameter(ForumElement.USER_ID_PROPERTY);

      /* Obtains the topic if the element is a question with no parentId */
      String topic = "none";
      if (id == -1) {
        topic = request.getParameter(ForumElement.TOPIC_PROPERTY);
      }

      String text = request.getParameter(ForumElement.TEXT_PROPERTY);
      addForumEntity(id, topic, text, userId);

      /* Increments the replies of the parent if there is a parent */
      if (id != -1) {
        incrementProperty(ForumElement.NUMBER_REPLIES_PROPERTY, id);
      }

      response.sendRedirect("/forum.html?topic=" + topicFilter + "&sort=" + sortFilter);
    }

    if (action.equals(FILTER_PROPERTY)) {
      /* Gets the new filter preferences */
      String topic = request.getParameter(ForumElement.TOPIC_PROPERTY);
      String sort = request.getParameter(SORT_PROPERTY);
      String user = request.getParameter(ForumElement.USER_ID_PROPERTY);
      topicFilter = topic;
      sortFilter = sort;
      response.sendRedirect(
          "/forum.html?topic=" + topicFilter + "&sort=" + sortFilter + "&userId=" + user);
    }

    if (action.equals(ForumElement.ACCEPTED_PROPERTY)) {
      long id = Long.parseLong(request.getParameter(ForumElement.ID_PROPERTY));
      Entity entity = getEntity(id);
      entity.setProperty(ForumElement.ACCEPTED_PROPERTY, true);
    }
  }

  private Entity getEntity(long id) {
    Key key = KeyFactory.createKey("ForumElement", id);
    Filter filter = new FilterPredicate(Entity.KEY_RESERVED_PROPERTY, FilterOperator.EQUAL, key);
    Query query = new Query("ForumElement").setFilter(filter);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    Entity entity = results.asSingleEntity();
    return entity;
  }

  /** Gets a list of forum elements from Datastore with id given */
  private List<ForumElement> getForumElements(long id) {
    Query query = getQuery(id);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<ForumElement> elements = new ArrayList<>();
    for (Entity entity : results.asIterable()) {
      elements.add(ForumElement.createWithEntity(entity));
    }
    return elements;
  }

  /* Returns the query for the Datastore given the id and topic filters and a given sorting */
  private Query getQuery(long id) {
    Filter filter;
    String sort;
    /* Filter by topic if there is a topic filter and the filter is for questions */
    if (topicFilter.equals("all") || id != -1) {
      filter = new FilterPredicate(ForumElement.PARENT_ID_PROPERTY, FilterOperator.EQUAL, id);
    } else {
      filter =
          new CompositeFilter(
              CompositeFilterOperator.AND,
              Arrays.asList(
                  new FilterPredicate(ForumElement.PARENT_ID_PROPERTY, FilterOperator.EQUAL, id),
                  new FilterPredicate(
                      ForumElement.TOPIC_PROPERTY, FilterOperator.EQUAL, topicFilter)));
    }

    /* Determine sort property - if question use given sort property, if comment always sort by likes */
    if (id == -1) {
      sort = sortFilter;
    } else {
      sort = ForumElement.LIKES_PROPERTY;
    }

    Query query =
        new Query("ForumElement").setFilter(filter).addSort(sort, SortDirection.DESCENDING);
    return query;
  }

  /** Increments property of element given id in Datastore - used for likes and replies */
  private void incrementProperty(String property, long id) {
    Key key = KeyFactory.createKey("ForumElement", id);
    Filter filter = new FilterPredicate(Entity.KEY_RESERVED_PROPERTY, FilterOperator.EQUAL, key);
    Query query = new Query("ForumElement").setFilter(filter);
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    for (Entity entity : results.asIterable()) {
      long num = (long) entity.getProperty(property);
      entity.setProperty(property, num + 1);
      datastore.put(entity);
    }

    Query query =
        new Query("ForumElement").setFilter(filter).addSort(sort, SortDirection.DESCENDING);
    return query;
  }

  /** Increments property of element given id in Datastore - used for likes and replies */
  private void incrementProperty(String property, long id) {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    Entity entity = getEntity(id);
    long num = (long) entity.getProperty(property);
    entity.setProperty(property, num + 1);
    datastore.put(entity);
  }

  /** Creates new entitiy given parentId, topic, and text and stores in Datastore */
  private void addForumEntity(long parentId, String topic, String text, String userId) {
    Entity forumEntity = new Entity("ForumElement");
    forumEntity.setProperty(ForumElement.PARENT_ID_PROPERTY, parentId);
    forumEntity.setProperty(ForumElement.TOPIC_PROPERTY, topic);
    long timestamp = System.currentTimeMillis();
    forumEntity.setProperty(ForumElement.TIMESTAMP_PROPERTY, timestamp);
    forumEntity.setProperty(ForumElement.LIKES_PROPERTY, 0);
    forumEntity.setProperty(ForumElement.TEXT_PROPERTY, text);
    forumEntity.setProperty(ForumElement.NUMBER_REPLIES_PROPERTY, 0);
    forumEntity.setProperty(ForumElement.USER_ID_PROPERTY, userId);
    if (parentId == -1) {
      forumEntity.setProperty(ForumElement.QUESTION_ID_PROPERTY, -1);
    } else {
      forumEntity.setProperty(ForumElement.QUESTION_ID_PROPERTY, getQuestionId(parentId));
    }
    forumEntity.setProperty(ForumElement.ACCEPTED_PROPERTY, false);


    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(forumEntity);
  }

  /** Gets the question id (the id of the parent question) for a forum element */
  private long getQuestionId(long id) {
    Entity entity = getEntity(id);
    long questionId = (long) entity.getProperty(ForumElement.QUESTION_ID_PROPERTY);
    if (questionId == -1) {
      return id;
    } else {
      return questionId;
    }
  }
}
