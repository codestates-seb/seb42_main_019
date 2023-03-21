package izone.izoneProject.user.repository;

import izone.izoneProject.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    boolean existsByName(String name);

    Optional<User> findById(long userId);
    Optional<User> findByEmail(String email);
//    @Modifying
//    @Query(value = "INSERT IGNORE INTO user_like (like_user_id, user_id) SELECT :likeUserId, :userId " +
//            "from dual WHERE NOT EXISTS (SELECT like_user_id, user_id FROM user_like WHERE like_user_id = :like_user_id and user_id = :userId)", nativeQuery = true)
//    int like(long likeUserId, long userId);
//
//    @Modifying(flushAutomatically = true, clearAutomatically = true)
//    @Query(value = "DELETE FROM user_like WHERE like_user_id = :likeUserId AND user_id = :userId", nativeQuery = true)
//    int unlike(long likeUserId, long userId);
//    @Modifying
//    @Query(value = "INSERT IGNORE INTO user_dislike (dislike_user_id, user_id) SELECT :dislikeUserId, :userId " +
//            "from dual WHERE NOT EXISTS (SELECT dislike_user_id, user_id FROM user_like WHERE dislike_user_id = :dislike_user_id and user_id = :userId)", nativeQuery = true)
//    int dislike(long dislikeUserId, long userId);
//
//
//    @Modifying(flushAutomatically = true, clearAutomatically = true)
//    @Query(value = "DELETE FROM user_dislike WHERE dislike_user_id = :dislikeUserId AND user_id = :userId", nativeQuery = true)
//    int unDislike(long dislikeUserId, long userId);

}
