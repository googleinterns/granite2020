package com.google.sps.data;

/** An item for a suggestion */
public final class Suggestion {

  private final String platform;
  private final String addition;
  private final long timestamp;

  public Suggestion(String platform, String addition, long timestamp) {
    this.platform = platform;
    this.addition = addition;
    this.timestamp = timestamp;
  }
}
