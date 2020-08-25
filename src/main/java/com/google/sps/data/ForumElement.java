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
  public static final String USER_ID_PROPERTY = "userId";
  public static final String QUESTION_ID_PROPERTY = "questionId";
  public static final String ACCEPTED_PROPERTY = "accepted";
  private final long id;
  private final long parentId;
  private final String topic;
  private final long timestamp;
  private final long likes;
  private final String text;
  private final long numberReplies;
  private final String userId;
  private final long questionId;
  private final boolean accepted;

  private ForumElement(
      long id,
      long parentId,
      String topic,
      long timestamp,
      long likes,
      String text,
      long numberReplies,
      String userId,
      long questionId,
      boolean accepted) {
    this.id = id;
    this.parentId = parentId;
    this.topic = topic;
    this.timestamp = timestamp;
    this.likes = likes;
    this.text = text;
    this.numberReplies = numberReplies;
    this.userId = userId;
    this.questionId = questionId;
    this.accepted = accepted;
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
    String userId = (String) entity.getProperty(USER_ID_PROPERTY);
    long questionId = (long) entity.getProperty(QUESTION_ID_PROPERTY);
    boolean accepted = (boolean) entity.getProperty(ACCEPTED_PROPERTY);

    return new ForumElement(
        id, parentId, topic, timestamp, likes, text, numberReplies, userId, questionId, accepted);
  }
}
