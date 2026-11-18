
package com.interview.interview._assistant.service;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import com.interview.interview._assistant.dto.InterviewQuestionResponse;
import com.interview.interview._assistant.dto.InterviewRequest;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Service
public class InterviewService {
	private final StringRedisTemplate redisTemplate;
	private final AIQuestionService aiQuestionService;
	
	public InterviewService(StringRedisTemplate redisTemplate,AIQuestionService aiQuestionService) {
		super();
		this.redisTemplate = redisTemplate;
		this.aiQuestionService=aiQuestionService;
	}
	 public List<InterviewQuestionResponse> generateQuestions(
	            InterviewRequest request) {
	 // Create a unique key for each interview request
	String cacheKey = "interview:"+
	 request.getLanguage()+":"
	 + request.getTopic()+":"
	 + request.getDifficulty();
	

    // Check Redis for previously generated questions
	String cachedCount = (String) redisTemplate.opsForHash().get(cacheKey,"count");
	
	  // 3. Cache HIT: Retrieve existing questions and answers
	 if(cachedCount!=null) {
		 System.out.println("cache Hit");
		 List<InterviewQuestionResponse> questions = new ArrayList<>();
		 int count = Integer.parseInt(cachedCount);
		    for (int i = 0; i < count; i++) {

                String question = (String) redisTemplate.opsForHash()
                        .get(cacheKey, "question:" + i);

                String answer = (String) redisTemplate.opsForHash()
                        .get(cacheKey, "answer:" + i);

                questions.add(
                        new InterviewQuestionResponse(question, answer)
                );
            }

            return questions;
	 }
	// 4. Cache MISS: Generate new questions
     System.out.println("Cache MISS - Generating questions");
     

     // Temporary hardcoded questions.
     // Later, Spring AI will generate these dynamically.
     List<InterviewQuestionResponse> generatedQuestions = aiQuestionService.generateQuestions
    		 (request.getLanguage(), request.getTopic(), request.getDifficulty());
     
     // 5. Store total question count in Redis
     redisTemplate.opsForHash().put(
             cacheKey,
             "count",
             String.valueOf(generatedQuestions.size())
     );
     // 6. Store each question and answer in Redis
     for(int i=0;i<generatedQuestions.size();i++) {
    	 InterviewQuestionResponse item = generatedQuestions.get(i);
    	 redisTemplate.opsForHash().put(cacheKey, "question:" +i, item.getQuestion());
    	 redisTemplate.opsForHash().put(cacheKey, "answer:"+i, item.getAnswer());
     }
     // 7. Set Redis cache expiration to one hour
     redisTemplate.expire(cacheKey, Duration.ofHours(1));

     // 8. Return generated questions and answers
     return generatedQuestions;
	 
	 }

  
	
}
