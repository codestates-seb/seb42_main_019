package izone.izoneProject.message.controller;

import izone.izoneProject.message.dto.MessageDto;
import izone.izoneProject.message.service.MessageService;
import izone.izoneProject.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;
    private final UserRepository userRepository;

    //@ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/messages")
    public ResponseEntity sendMessage(@RequestBody MessageDto message) {

       return new  ResponseEntity<>(message.getContent(),HttpStatus.CREATED);
    }

    @GetMapping("/messages/received")
    public ResponseEntity receiverMessage(@RequestBody MessageDto message) {

        return ResponseEntity.ok(message.getContent());
    }

    @DeleteMapping("/messages/received/{user-id}")
    public ResponseEntity deletereceivedMessage(@PathVariable("user-id") long userId) {

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
