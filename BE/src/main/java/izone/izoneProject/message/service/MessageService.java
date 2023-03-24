package izone.izoneProject.message.service;

import izone.izoneProject.message.entity.Message;
import izone.izoneProject.message.repository.MessageReadRepository;
import izone.izoneProject.message.repository.MessageRepository;
import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MessageService {
    private final MessageRepository messageRepository;

    private final MessageReadRepository messageReadRepository;
    private final UserService           userService;


    /**
     * <b>@Transactional(readOnly = true)</b>
     * <p>readOnlu=true 해당 메서드가 읽기 전용이라는 것을 명시하고, 영속성 컨텍스트에 관리를 받지않게 된다.</p>
     * <p>JPA사용시, 변경감지 수행등을 하지 않아 변경감지 작업을 수행하지 않음</p>
     * <p>CRUD를 하는 service에서 클래스에 @Transactional을 통해 중복을 줄이고 싶을 때</p>
     * <p>격리 수준보다 낮은 수준의 격리 수준을 사용하게 된다.</p>
     * <p></p>
     * <p>즉, 상황에 따라 DB 서버의 부하를 줄일 수 있다.</p>
     */


    public Message writeMessage(long senderId, long receiverId, Message message) {
        User sender   = userService.verifyUser(senderId);
        User receiver = userService.verifyUser(receiverId);

        sender.getSentList().add(message);
        receiver.getReceivedList().add(message);

        message.setSender(sender);
        message.setUser(receiver);

        User getSender   = message.getSender();   //TODO: message에 저장될 sender 정보
        User getReceiver = message.getUser();   //TODO: receiver 정보

        return messageRepository.save(message);
    }

    @Transactional(readOnly = true)
    public Page<Message> findReceivedMessages(long receiverId, Pageable pageable) {

        Pageable pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());
        return messageRepository.findByUserId(receiverId, pageRequest);

    }

    @Transactional(readOnly = true)
    public Page<Message> findSentMessages(long senderId, Pageable pageable) {

        Pageable pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());
        return messageRepository.findBySenderId(senderId, pageRequest);
    }

    //TODO: delete 기존 구현
//    public void deleteSender(long senderId) {
//        Message findSender = findVerifiedSender(senderId);
//        messageRepository.delete(findSender);
//    }
//
//    public void deleteReceiver(long receiverId) {
//        Message findReceiver = findVerifiedReceiver(receiverId);
//        messageRepository.delete(findReceiver);
//    }

//    public Message findMessage(long messageId) {
//        return findVerifiedMessage(messageId);
//    }

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


    //TODO: list.remove(messageId)
//    public List<Message> deleteReceived(long messageId, long receiverId) {
//        Message message = findVerifiedReceiver(receiverId);
//        deleteReceived(message).addAll();
//    }

    //TODO: list.remove(messageId)
    // 나는 messageId와 receiverId를 일치시켜서 해당 receiver에 일치하는 메세지를 삭제하는게 복잡하다
    // 사용자 화면상에서만 삭제되는 걸로 표현 -> receivedList에 receiverId를 담아왔음 -> 여기서 해당되는 messageId를 삭제한다.
    // messageId 들어오는 기준 => senderId 보낸 순서 기준이다. senderId 3번이 첫번째로 보내면 messageId 3 = senderId 3과 같다.
    // 삭제하려면 remove에 mesaageId == senderId (?)
    public void deleteReceived (long messageId, long receiverId) {
        List<Message> receivedList = messageRepository.findAllByUserId(receiverId);
        receivedList.remove()
//        receivedList.addAll(messageRepository.findAllByUserId(receiverId));
}


//    //TODO: 받은 쪽지 삭제
//    public Object deleteMessageByReceiver(long messageId, User receiver) {
//        Message message = messageRepository.findById(messageId).orElseThrow(() -> {
//
//            return new IllegalArgumentException("메세지를 찾을 수 없습니다.");
//        });
//
//        if (receiver == message.getSender()) {
//            message.deleteByReceiver();
//            if (message.isDeleted()) {
//                messageRepository.delete(message);
//                return "모두에게 삭제";
//            }
//            return "해당 유저에게만 삭제";
//        } else {
//            return new IllegalArgumentException("유저 정보가 일치하지 않습니다.");
//        }
//    }
//
//    public Object deleteMessageBySender(long messageId, User user) {
//        Message message = messageRepository.findById(messageId).orElseThrow(() -> {
//
//            return new IllegalArgumentException("쪽지를 찾을 수 없습니다.");
//        });
//
//        if (user == message.getSender()) {
//            message.deleteBySender();
//            if (message.isDeleted()) {
//                messageRepository.delete(message);
//                return "모두에게 삭제";
//            }
//            return "해당 유저에게만 삭제";
//        } else {
//            return new IllegalArgumentException("유저 정보가 일치하지 않습니다.");
//        }

    //TODO: 받은 쪽지들을 default 값으로 0으로 설정후, 확인이 된 (체크된) receiverId를
    //      +1하여 count한다. 전체 쪽지에서 count된 received를 제외하여 남은 쪽지 수 어쩌구 저쩌구 어떡하냐
//    public Message unreadMessage(Message readAt, long receiverId) {
//
//    }
//
//    public ReadAt findUnReadMessage(long receiverId) {
//
//    }
}



