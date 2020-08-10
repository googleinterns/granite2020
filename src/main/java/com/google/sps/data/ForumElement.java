import com.google.appengine.api.datastore.Entity;
package com.google.sps.data;

/** A comment or question element of the forum. */
public final class ForumElement {
  private final long id;
  private final long parentId;
  private final String topic;
  private final long timestamp;
  private final long likes;
  private final String text;

  public ForumElement(
      long id, long parentId, String topic, long timestamp, long likes, String text) {
    this.id = id;
    this.parentId = parentId;
    this.topic = topic;
    this.timestamp = timestamp;
    this.likes = likes;
    this.text = text;
    // TODO: Add user data to comment data
  }

  /** Inputs an entity and returns a new forum element using the fields of the entity */
  public static ForumElement createWithEntity(Entity entity) {
    long id = entity.getKey().getId();
    long parentId = (long) entity.getProperty("parentId");
    String topic = (String) entity.getProperty("topic");
    long timestamp = (long) entity.getProperty("timestamp");
    long likes = (long) entity.getProperty("likes");
    String text = (String) entity.getProperty("text");
    // TODO: Get user information

    return new ForumElement(id, parentId, topic, timestamp, likes, text);
  }
}
