package izone.izoneProject.message.controller;

import izone.izoneProject.message.dto.MessageDto;
import izone.izoneProject.message.dto.MessagePostDto;
import izone.izoneProject.message.entity.Message;
import izone.izoneProject.message.mapper.MessageMapper;
import izone.izoneProject.message.service.MessageService;
import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.connector.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;
    private final MessageMapper mapper;
    //@ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/message/{sender-id}/{receiver-id}")
    public ResponseEntity sendMessage(@PathVariable("sender-id") @Positive long senderId,
                                      @PathVariable("receiver-id")@Positive long receiverId,
                                      @RequestBody @Valid MessagePostDto messagePostDto) {
        //User user = userRepository.findById(1L).orElseThrow(() -> {
        //    return new IllegalArgumentException("유저를 찾을 수 없습니다.");
        //});

        Message message = mapper.postDtoToMessage(messagePostDto);

        Message sendMessage = messageService.writeMessage(senderId,receiverId,message);


        return new ResponseEntity<>(mapper.messageToResponseDto(sendMessage), HttpStatus.CREATED);
    }

//    @GetMapping("/messages/{sender-id}")
//    public ResponseEntity sentMessage(@PathVariable("sender-id") long senderId) {
//
//        Message message = messageService.findMessage()
//
//
//        return new ResponseEntity<>(mapper.messageToResponseDto(), HttpStatus.OK);
//    }

    @GetMapping("")


    @DeleteMapping("/messages/received/{user-id}")
    public ResponseEntity deleteReceivedMessage(@PathVariable("user-id") long userId) {

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
