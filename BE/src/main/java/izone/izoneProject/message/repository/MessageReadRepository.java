package izone.izoneProject.message.repository;

import izone.izoneProject.message.entity.ReadAt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.expression.spel.ast.OpAnd;

import java.util.Optional;

public interface MessageReadRepository extends JpaRepository<ReadAt, Long> {

//    @Query(value = "SELECT * FROM message WHERE receiver_id = :receiverId", nativeQuery = true)
//    Optional<ReadAt> findByUnReadMessage(long receiverId);

    @Modifying(clearAutomatically = true) // 영속성 초기화 (?)
    @Query("count Read r set r.count = r.count + 1 where r.read_id = :readId")
    long countByIsReadAt(long readId);
}
