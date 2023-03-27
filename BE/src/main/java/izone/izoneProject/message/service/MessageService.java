package izone.izoneProject.message.service;

import izone.izoneProject.book.entity.Book;
import izone.izoneProject.message.dto.MessageResponseDto;
import izone.izoneProject.message.entity.Message;
//import izone.izoneProject.message.repository.MessageReadRepository;
import izone.izoneProject.message.mapper.MessageMapper;
import izone.izoneProject.message.repository.MessageRepository;
import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.repository.UserRepository;
import izone.izoneProject.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MessageService {
    private final MessageRepository messageRepository;

//    private final MessageReadRepository messageReadRepository;
    private final UserService           userService;
    private final MessageMapper mapper;
    private final UserRepository userRepository;


    /**
     * <b>@Transactional(readOnly = true)</b>
     * <p>readOnlu=true 해당 메서드가 읽기 전용이라는 것을 명시하고, 영속성 컨텍스트에 관리를 받지않게 된다.</p>
     * <p>JPA사용시, 변경감지 수행등을 하지 않아 변경감지 작업을 수행하지 않음</p>
     * <p>CRUD를 하는 service에서 클래스에 @Transactional을 통해 중복을 줄이고 싶을 때</p>
     * <p>격리 수준보다 낮은 수준의 격리 수준을 사용하게 된다.</p>
     * <p></p>
     * <p>즉, 상황에 따라 DB 서버의 부하를 줄일 수 있다.</p>
     */


    public Message writeMessage(long receiverId, Message message) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User sender   = optionalUser.orElseThrow(()->new RuntimeException("permission denied"));
        User receiver = userService.verifyUser(receiverId);

        sender.getSentList().add(message);
        receiver.getReceivedList().add(message);

        message.setSender(sender);
        message.setUser(receiver);


        return messageRepository.save(message);
    }

    @Transactional(readOnly = true)
    public Page<Message> findReceivedMessages(Pageable pageable) {

        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(()->new RuntimeException("permission denied"));
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());

        return messageRepository.findByUserId(user.getUserId(), pageRequest);

    }

    @Transactional(readOnly = true)
    public Page<Message> findSentMessages(Pageable pageable) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(()->new RuntimeException("permission denied"));
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());


        return messageRepository.findBySenderId(user.getUserId(), pageRequest);
    }

    public Message findVerifiedSender(long senderId) {
        Optional<Message> optionalSender = messageRepository.findById(senderId);
        Message findSender = optionalSender.orElseThrow(() ->
                new RuntimeException("Message Not Found"));

        return findSender;
    }

    public Message findVerifiedReceiver(long receiverId) {
        Optional<Message> optionalReceiver = messageRepository.findById(receiverId);
        Message findReceiver = optionalReceiver.orElseThrow(() ->
                new RuntimeException("Message Not Found"));

        return findReceiver;
    }

    //TODO: readAt을 기본 null로 생성하여 count 조회
    // 생성 시, null로 된 message의 갯수를 조회하여 숫자로 조회
    // 하지만, readAt을 setReadAt하여 messageId를 통해 메세지 단일 조회 후, readAt이 갱신되도록 하였지만,
    // messageRepository.save(message)를 사용하여도 데이터가 저장되지 않았음.
    // 왜.....why....?
    public MessageResponseDto markAsRead(long messageId) {
        Message message = messageRepository.findByMessageId(messageId);
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if (!userService.verifyUser(message.getUser().getUserId()).getEmail().equals(principal))
            throw new RuntimeException("permission denied");
        if (message.getReadAt() == null) {
            message.setReadAt(LocalDateTime.now());
            messageRepository.save(message);
        }

        return mapper.messageToResponseDto(message);
    }

    public int countUnreadMessages() {
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(()->new RuntimeException("permission denied"));

        return messageRepository.countByReadAtIsNull(user.getUserId());
    }

    //TODO: list.remove(messageId)
    // messageId와 receiverId를 일치시켜서 해당 receiver에 일치하는 메세지를 삭제하는게 복잡하다
    // 사용자 화면상에서만 삭제되는 걸로 표현 -> receivedList에 receiverId를 담아왔음 -> 여기서 해당되는 messageId를 삭제한다.
    // messageId 들어오는 기준 => senderId 보낸 순서 기준이다. senderId 3번이 첫번째로 보내면 messageId 3 = senderId 3과 같다.
    // 삭제하려면 remove에 mesaageId == senderId (?)
    public List<Message> deleteMessage(long messageId) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(() -> new RuntimeException("permission denied"));

        messageRepository.deleteById(messageId);
        return messageRepository.findAllByUserId(user.getUserId());
    }
}



