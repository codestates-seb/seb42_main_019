package izone.izoneProject.user.repository;

import izone.izoneProject.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    boolean existsByName(String name);

    Optional<User> findById(long userId);
    Optional<User> findByEmail(String email);

}
