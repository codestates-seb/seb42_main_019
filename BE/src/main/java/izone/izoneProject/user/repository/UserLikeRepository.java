package izone.izoneProject.user.repository;

import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.entity.UserLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserLikeRepository extends JpaRepository<UserLike, Long> {
//    Optional<UserLike> findByLikerAndUser(User user, User liker);
    Optional<UserLike> findByLiker(User liker);
}
