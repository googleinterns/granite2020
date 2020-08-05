package com.google.sps.data;

/** A comment or question element of the forum. */
public final class ForumElement {

  private final long id;
  private final long parentId;
  private final String topic;
  private final long timestamp;
  private final long likes;
  private final String text;
  // private final long userId

  public ForumElement(
      long id, long parentId, String topic, long timestamp, long likes, String text) {
    this.id = id;
    this.parentId = parentId;
    this.topic = topic;
    this.timestamp = timestamp;
    this.likes = likes;
    // TODO: Add user data to comment data
    this.text = text;
  }
}
