package com.google.sps.data;

/** An item on a todo list. */
public final class Suggestion {

  private final long id;
  private final String platform;
  private final String addition;
  private final long timestamp;

  public Suggestion(long id, String platform, String addition, long timestamp) {
    this.id = id;
    this.platform = platform;
    this.addition = addition;
    this.timestamp = timestamp;
  }
}