package izone.izoneProject.message.controller;

import izone.izoneProject.common.dto.PageDto;
import izone.izoneProject.message.dto.MessagePostDto;
import izone.izoneProject.message.dto.MessageResponseDto;
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


    @PostMapping("/{receiver-id}")
    public ResponseEntity sendMessage(@PathVariable("receiver-id") @Positive long receiverId,
                                      @RequestBody @Valid MessagePostDto messagePostDto) {
        Message message = mapper.postDtoToMessage(messagePostDto);

        Message sendMessage = messageService.writeMessage(receiverId, message);


        return new ResponseEntity<>(mapper.messageToResponseDto(sendMessage), HttpStatus.CREATED);
    }

    @PutMapping("/messages/{message-id}")
    public ResponseEntity<?> getMessage(@PathVariable("message-id") long messageId) {
        MessageResponseDto responseDto = messageService.markAsRead(messageId);

        return ResponseEntity.ok(responseDto);
    }

    @GetMapping("/messages/unread")
    public ResponseEntity<?> unreadCount() {
        long count = messageService.countUnreadMessages();
        return ResponseEntity.ok(count);
    }


    @GetMapping("/sent")
    public ResponseEntity getSentMessages (Pageable pageable) {
        Page<Message> pageMessages = messageService.findSentMessages(pageable);
        List<Message> sentList = pageMessages.getContent();

        return new ResponseEntity<>(
                new PageDto<>(mapper.messageToResponseDto(sentList), pageMessages), HttpStatus.OK);

    }


    @GetMapping("/received")
        public ResponseEntity<?> getReceivedMessages (Pageable pageable) {
        Page<Message> messageList = messageService.findReceivedMessages( pageable);
        List<Message> contents = messageList.getContent();

        return new ResponseEntity<>(
                new PageDto<>(mapper.messageToResponseDto(contents),messageList), HttpStatus.OK);
    }

    @GetMapping("/unread")
    public ResponseEntity<?> countUnreadCount() {
        long count = messageService.countUnreadMessages();
        return ResponseEntity.ok(count);
    }


    @DeleteMapping("/{message-id}")
    public ResponseEntity<?> deleteReceivedMessage (@PathVariable("message-id") @Positive long messageId) {
        List<Message> messageList = messageService.deleteMessage(messageId);

        return new ResponseEntity<>(mapper.messageToResponseDto(messageList), HttpStatus.OK);
    }
}