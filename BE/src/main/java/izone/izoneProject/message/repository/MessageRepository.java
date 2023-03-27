package izone.izoneProject.message.repository;

import izone.izoneProject.message.entity.Message;
import izone.izoneProject.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MessageRepository extends JpaRepository<Message, Long> {

    //TODO: Pagination
    @Query(value = "SELECT * FROM message WHERE sender_id = :senderId", nativeQuery = true)
    Page<Message> findBySenderId(long senderId, Pageable pageable);

    @Query(value = "SELECT * FROM message WHERE receiver_id = :receiverId", nativeQuery = true)
    Page<Message> findByUserId(long receiverId, Pageable pageable);


    Message findByMessageId(long messageId);



    //TODO: delete 구현
    @Query(value = "SELECT * FROM message WHERE sender_id = :senderId", nativeQuery = true)
    List<Message> findAllBySenderId(long senderId);

    @Query(value = "SELECT * FROM message WHERE receiver_id = :receiverId", nativeQuery = true)
    List<Message> findAllByUserId(long receiverId);

    @Query(value = "SELECT COUNT(*) FROM message WHERE receiver_id = :receiverId AND read_date_time is NULL", nativeQuery = true)
    int countByReadAtIsNull(long receiverId);
}
