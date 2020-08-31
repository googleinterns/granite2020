package com.google.sps.data;

import com.google.appengine.api.datastore.Entity;

/** A comment or question element of the forum. */
public final class ForumElement {
  public static final String ID_PROPERTY = "id";
  public static final String PARENT_ID_PROPERTY = "parentId";
  public static final String TOPIC_PROPERTY = "topic";
  public static final String TEXT_PROPERTY = "text";
  public static final String TIMESTAMP_PROPERTY = "timestamp";
  public static final String LIKES_PROPERTY = "likes";
  public static final String NUMBER_REPLIES_PROPERTY = "numberReplies";
  private final long id;
  private final long parentId;
  private final String topic;
  private final long timestamp;
  private final long likes;
  private final String text;
  private final long numberReplies;

  private ForumElement(
      long id,
      long parentId,
      String topic,
      long timestamp,
      long likes,
      String text,
      long numberReplies) {
    this.id = id;
    this.parentId = parentId;
    this.topic = topic;
    this.timestamp = timestamp;
    this.likes = likes;
    this.text = text;
    this.numberReplies = numberReplies;
    // TODO: Add user data to comment data and accepted answer
  }

  /** Inputs an entity and returns a new forum element using the fields of the entity */
  public static ForumElement createWithEntity(Entity entity) {
    long id = entity.getKey().getId();
    long parentId = (long) entity.getProperty(PARENT_ID_PROPERTY);
    String topic = (String) entity.getProperty(TOPIC_PROPERTY);
    long timestamp = (long) entity.getProperty(TIMESTAMP_PROPERTY);
    long likes = (long) entity.getProperty(LIKES_PROPERTY);
    String text = (String) entity.getProperty(TEXT_PROPERTY);
    long numberReplies = (long) entity.getProperty(NUMBER_REPLIES_PROPERTY);
    // TODO: Get user information

    return new ForumElement(id, parentId, topic, timestamp, likes, text, numberReplies);
  }
}
