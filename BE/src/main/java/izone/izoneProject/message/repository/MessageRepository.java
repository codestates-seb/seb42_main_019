package izone.izoneProject.message.repository;

import izone.izoneProject.message.entity.Message;
import izone.izoneProject.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    //해당 메서드에 user 값을 넣으면, Message 엔티티의 Sender, Receiver 필드에서
    //user 값과 일치하는 Message들을 List로 묶어준다.
    //List<Message> findAllByReceiver(User user);
    //List<Message> findAllBySender(User user);
}
