package izone.izoneProject.message.controller;

import izone.izoneProject.message.entity.ReadAt;
import izone.izoneProject.message.repository.MessageReadRepository;
import izone.izoneProject.message.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/messages")
@Validated
@RequiredArgsConstructor
public class MessageReadController {

    private final MessageRepository messageRepository;
    private final MessageReadRepository messageReadRepository;

    @GetMapping("/read/{read-id}")
    public ResponseEntity readCount(@PathVariable("read-id") long readId) {

    }

}
