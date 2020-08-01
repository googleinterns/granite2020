
package com.google.sps.data;

/** A comment or question element of the forum. */
public final class ForumElement {

  private final long id;
  private final long parent_id;
  private final String topic;
  private final long timestamp;
  private final long likes;
  private final String text;
  // private final long user_id

  public ForumElement(long id, long parent_id, String topic, long timestamp, long likes, String text) {
    this.id = id;
    this.parent_id = parent_id;
    this.topic = topic;
    this.timestamp = timestamp;
    this.likes = likes;
    this.text = text;
    // this.user_id = user_id;
    // TODO: Store User data
  }
}