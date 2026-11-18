
package com.interview.interview._assistant.dto;

public class InterviewRequest {

    private String language;
    private String topic;
    private String difficulty;

    public InterviewRequest() {
    }

    public InterviewRequest(String language, String topic, String difficulty) {
        this.language = language;
        this.topic = topic;
        this.difficulty = difficulty;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }
}
