package izone.izoneProject.message.repository;

import izone.izoneProject.message.entity.Message;
import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.entity.UserComment;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    //해당 메서드에 user 값을 넣으면, Message 엔티티의 Sender, Receiver 필드에서
    //user 값과 일치하는 Message들을 List로 묶어준다.
    //List<Message> findAllByReceiver(User user);
    //List<Message> findAllBySender(User user);
    //@Mapping(source = "sender.name", target = "senderName") //TODO: mapping 추가

    //@Query(value = "SELECT * FROM user_receiver WHERE user_id = :userId", nativeQuery = true)

    //@Query(value = "SELECT * FROM user_comment WHERE user_id = :userId", nativeQuery = true)

    Page<Message> findByMessageId(long messageId, Pageable pageable);

}
