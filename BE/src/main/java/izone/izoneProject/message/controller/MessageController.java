package izone.izoneProject.message.controller;

import izone.izoneProject.common.dto.PageDto;
import izone.izoneProject.message.dto.MessagePostDto;
import izone.izoneProject.message.entity.Message;
import izone.izoneProject.message.mapper.MessageMapper;
import izone.izoneProject.message.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/messages")
@Validated
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;
    private final MessageMapper  mapper;


    @PostMapping("/{sender-id}/{receiver-id}")
    public ResponseEntity sendMessage(@PathVariable("sender-id") @Positive long senderId,
                                      @PathVariable("receiver-id") @Positive long receiverId,
                                      @RequestBody @Valid MessagePostDto messagePostDto) {
        //User user = userRepository.findById(1L).orElseThrow(() -> {
        //    return new IllegalArgumentException("유저를 찾을 수 없습니다.");
        //});

        Message message = mapper.postDtoToMessage(messagePostDto);

        Message sendMessage = messageService.writeMessage(senderId, receiverId, message);


        return new ResponseEntity<>(mapper.messageToResponseDto(sendMessage), HttpStatus.CREATED);
    }

//    @GetMapping("/messages/{message-id}")
//    public ResponseEntity getMessage(@PathVariable("message-id") long messageId) {
//
//        Message message = messageService.findMessage(messageId);
//
//        return new ResponseEntity<>(mapper.messageToResponseDto(message), HttpStatus.OK);
//    }


    @GetMapping("/sent/{sender-id}")
    public ResponseEntity getSentMessages (@PathVariable("sender-id") long senderId, Pageable pageable) {

        Page<Message> pageMessages = messageService.findSentMessages(senderId, pageable);
        List<Message> sentList = pageMessages.getContent();

        return new ResponseEntity<>(
                new PageDto<>(mapper.messageToResponseDto(sentList), pageMessages), HttpStatus.OK);

    }


    @GetMapping("/received/{receiver-id}")
        public ResponseEntity getReceivedMessages (@PathVariable("receiver-id") long receiverId, Pageable pageable) {

        Page<Message> pageMessages = messageService.findReceivedMessages(receiverId, pageable);
        List<Message> receivedList = pageMessages.getContent();

        return new ResponseEntity<>(
                new PageDto<>(mapper.messageToResponseDto(receivedList), pageMessages), HttpStatus.OK);
    }




//    @DeleteMapping("/{sender-id}")
//    public ResponseEntity deleteSentMessage(@PathVariable("sender-id") @Positive long senderId) {
//
//        messageService.deleteSender(senderId);
//
//        return new ResponseEntity(HttpStatus.NO_CONTENT);
//    }


//    @DeleteMapping("/received/{receiver-id}")
//    public ResponseEntity deleteReceivedMessage (@PathVariable("receiver-id") @Positive long receiverId) {
//
//        messageService.deleteReceiver(receiverId);
//
//        return new ResponseEntity(HttpStatus.NO_CONTENT);
//    }

//    @DeleteMapping("/messages/recevied/{receiver-id}")
//    private ResponseEntity deleteSentMessage(@PathVariable(""))
}