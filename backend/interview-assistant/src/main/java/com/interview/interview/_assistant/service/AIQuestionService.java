package com.interview.interview._assistant.service;

import java.util.List;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.converter.BeanOutputConverter;
import org.springframework.stereotype.Service;

import com.interview.interview._assistant.dto.InterviewQuestionResponse;

@Service
public class AIQuestionService {
	private ChatClient chatClient;

	public AIQuestionService(ChatClient.Builder chatClient) {
		super();
		this.chatClient = chatClient.build();
	}
	
	public List<InterviewQuestionResponse> generateQuestions(String language,String topic,String difficulty) {
		
		BeanOutputConverter<InterviewQuestionResponse[]> converter = new BeanOutputConverter<>(InterviewQuestionResponse[].class);

        String prompt = """
                Generate 10 technical interview questions and answers.



                Programming Language: %s
                Topic: %s
                Difficulty: %s

                Provide clear questions and detailed answers.
                Use simple English.
                
                Return the response in this JSON format:
                %s
                """.formatted(language, topic, difficulty,converter.getFormat());
        InterviewQuestionResponse[]  response =  chatClient.prompt()
                .user(prompt)
                .call()
                .entity(InterviewQuestionResponse[].class);
        return List.of(response);
	}
	

}
