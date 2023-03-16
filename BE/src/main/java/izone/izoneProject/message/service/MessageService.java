package izone.izoneProject.message.service;

import izone.izoneProject.message.entity.Message;
import izone.izoneProject.message.repository.MessageRepository;
import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.repository.UserRepository;
import izone.izoneProject.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MessageService {
    private final MessageRepository messageRepository;
    private final UserService       userService;


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
        message.setReceiver(receiver);

        return messageRepository.save(message);
    }

    //TODO: 받은 쪽지 목록 불러오기 (모든 쪽지)
    //@Transactional(readOnly = true)
    //public List<Message> receivedMessage(User user) {
    //    List<Message> messages = messageRepository.findAllByReceiver(user);

    //    return messages;
    //}

    //TODO: 받은 쪽지 삭제
   /* @Transactional
    public Object deleteMessageByReceiver(long messageId, User user) {
        Message message = messageRepository.findById(messageId).orElseThrow(() -> {

            return new IllegalArgumentException("쪽지를 찾을 수 없습니다.");
        });

        if (user == message.getSender()) {
            message.deleteByReceiver();     // 받은 사람에게 쪽지 삭제
            if (message.isDeleted()) {      // 받은 사람과 보낸 사람 모두 삭제시, DB에 삭제요청
                messageRepository.delete(message);
                return "모두에게 삭제";
            }
            return "해당 유저에게만 삭제";
        } else {
            return new IllegalArgumentException("유저 정보가 일치하지 않습니다.");
        }
    }*/

    //@Transactional(readOnly = true)
    //public List<Message> sentMessage(User user) {
    //    List<Message> messages = messageRepository.findAllBySender(user);

    //    return messages;
    //}

    /*@Transactional
    public Object deleteMessageBySender(long messageId, User user) {
        Message message = messageRepository.findById(messageId).orElseThrow(() -> {

            return new IllegalArgumentException("쪽지를 찾을 수 없습니다.");
        });

        if (user == message.getSender()) {
            message.deleteBySender();
            if (message.isDeleted()) {
                messageRepository.delete(message);
                return "모두에게 삭제";
            }
            return "해당 유저에게만 삭제";
        } else {
            return new IllegalArgumentException("유저 정보가 일치하지 않습니다.");
        }
    }*/
}
