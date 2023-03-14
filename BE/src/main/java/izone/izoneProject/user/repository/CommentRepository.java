package izone.izoneProject.user.repository;

import izone.izoneProject.user.entity.UserComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<UserComment, Long> {
    @Query(value = "SELECT * FROM user_comment WHERE user_id = :userId", nativeQuery = true)
    List<UserComment> findByUserId(long userId);
    @Query(value = "SELECT * FROM user_comment WHERE user_id = :userId", nativeQuery = true)
    Page<UserComment> findByUserId(long userId, Pageable pageable);
}
