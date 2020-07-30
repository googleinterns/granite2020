package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.sps.data.Suggestion;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for creating a suggestion. */
@WebServlet("/new-suggestion")
public class SuggestionServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String platform = request.getParameter("platform");
    String addition = request.getParameter("addition");
    long timestamp = System.currentTimeMillis();

    Entity suggestionEntity = new Entity("Suggestion");
    suggestionEntity.setProperty("platform", platform);
    suggestionEntity.setProperty("addition", addition);
    suggestionEntity.setProperty("timestamp", timestamp);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    datastore.put(suggestionEntity);

    response.sendRedirect("/index.html");
  }

  /*
  // LIST suggestions
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("Task").addSort("timestamp", SortDirection.DESCENDING);
    
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    List<Suggestion> suggestions = new ArrayList<>();                  
    
    for (Entity entity : results.asIterable()) {
      long id = entity.getKey().getId();
      String platform = (String) entity.getProperty("platform");
      String addition = (String) entity.getProperty("addition");
      long timestamp = (long) entity.getProperty("timestamp");
     
      Suggestion suggestion = new Suggestion(id, platform, addition, timestamp);
      suggestions.add(suggestion);
    }
    
    Gson gson = new Gson();
    
    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(suggestions));
  }
  */

}