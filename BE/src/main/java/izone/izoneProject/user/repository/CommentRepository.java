package izone.izoneProject.user.repository;

import izone.izoneProject.user.entity.UserComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<UserComment, Long> {
    @Query(value = "SELECT * FROM user_comment WHERE recipient_id = :recipientId", nativeQuery = true)
    List<UserComment> findByUserId(long recipientId);
    @Query(value = "SELECT * FROM user_comment WHERE recipient_id = :recipientId", nativeQuery = true)
    Page<UserComment> findByUserId(long recipientId, Pageable pageable);
}
