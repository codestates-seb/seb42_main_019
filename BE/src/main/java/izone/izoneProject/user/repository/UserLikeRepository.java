package izone.izoneProject.user.repository;

import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.entity.UserLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserLikeRepository extends JpaRepository<UserLike, Long> {
    Optional<UserLike> findByLikerAndUser(User user, User liker);

}
