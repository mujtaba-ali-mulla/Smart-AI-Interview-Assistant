package com.interview.interview._assistant.controller;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/redis")
public class ReddisTestController {
private final StringRedisTemplate redisTemplate;

public ReddisTestController(StringRedisTemplate redisTemplate) {
	super();
	this.redisTemplate = redisTemplate;
}
@PostMapping("/save")
public String saveData() {

    redisTemplate.opsForValue()
            .set("username", "Mujtaba");

    return "Data saved in Redis successfully";
}

@GetMapping("/get")
public String getData() {

    String value = redisTemplate.opsForValue()
            .get("username");

    return "Redis value: " + value;
}
}
