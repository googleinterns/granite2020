
package com.google.sps.servlets;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.Query.Filter;
//import com.google.cloud.datastore.StructuredQuery.PropertyFilter;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.gson.Gson;
import com.google.sps.data.ForumElement;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that handles comments data */
@WebServlet("/forum")
public class ForumServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException { 
    long parent_id_input = Long.parseLong(request.getParameter("parent_id"));

    Filter filter = new FilterPredicate("parent_id", FilterOperator.EQUAL, parent_id_input);
    
    Query query = new Query("ForumElement").setFilter(filter); //.addSort("likes", SortDirection.DESCENDING);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);

    List<ForumElement> elements = new ArrayList<>();

    for (Entity entity : results.asIterable()) {
      long id = entity.getKey().getId();
      long parent_id = (long) entity.getProperty("parent_id");
      String topic = (String) entity.getProperty("topic");
      long timestamp = (long) entity.getProperty("timestamp");
      long likes = (long) entity.getProperty("likes");
      String text = (String) entity.getProperty("text");
      //long user_id = (long) entity.getProperty("user_id");
      // TODO: Get user information

      ForumElement element = new ForumElement(id, parent_id, topic, timestamp, likes, text);

      elements.add(element);
    }

    Gson gson = new Gson();

    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(elements));
  }

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String new_element = request.getParameter("new_element");

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    if (new_element.equals("true")) {

      long parent_id = Long.parseLong(request.getParameter("parent_id"));
      String text = request.getParameter("text-input");
      String topic = "none";

      if (parent_id == -1) {
        topic = request.getParameter("topic-input");
      }

      long timestamp = System.currentTimeMillis();

      // UserService userService = UserServiceFactory.getUserService();
      // String user_id = userService.getCurrentUser().getUserId();
      // TODO: Include User data with Comment data

      Entity forumEntity = new Entity("ForumElement");
      forumEntity.setProperty("parent_id", parent_id);
      forumEntity.setProperty("topic", topic);
      forumEntity.setProperty("timestamp", timestamp);
      forumEntity.setProperty("likes", 0);
      forumEntity.setProperty("text", text);
      // forumEntity.setProperty("user_id", user_id);

      datastore.put(forumEntity);
      response.sendRedirect("/forum.html");

    }
    else {
      System.out.println("In servlet");
      long id = Long.parseLong(request.getParameter("id"));
      System.out.println(id);

      //Filter filter = PropertyFilter.gt("__key__", keyFactory.newKey(id));
      Filter filter = new FilterPredicate("id", FilterOperator.EQUAL, id);

      Query query = new Query("ForumElement").setFilter(filter);

      PreparedQuery results = datastore.prepare(query);

      for (Entity entity : results.asIterable()) {
        System.out.println("In for");
        long likes = (long) entity.getProperty("likes");
        entity.setProperty("likes", likes + 1);
        datastore.put(entity);
      }
      response.sendRedirect("/forum.html");
    }
  }
}
