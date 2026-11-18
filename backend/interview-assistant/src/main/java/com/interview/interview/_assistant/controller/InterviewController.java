package com.interview.interview._assistant.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.interview.interview._assistant.dto.InterviewQuestionResponse;
import com.interview.interview._assistant.dto.InterviewRequest;
import com.interview.interview._assistant.service.InterviewService;
@RestController
@RequestMapping("/api/interview")
@CrossOrigin(origins = "http://localhost:5173")
public class InterviewController {
private final InterviewService interviewService;

public InterviewController(InterviewService interviewService) {
	this.interviewService = interviewService;
}
@PostMapping("/generate")
public List<InterviewQuestionResponse> generateQuestions(
        @RequestBody InterviewRequest request) {

    return interviewService.generateQuestions(request);
}

}
