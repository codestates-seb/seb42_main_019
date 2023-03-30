package izone.izoneProject.book.repository;

import izone.izoneProject.book.entity.Book;
import izone.izoneProject.book.entity.BookLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import izone.izoneProject.user.entity.User;

import java.util.Optional;

@Repository
public interface BookLikeRepository extends JpaRepository<BookLike, Long> {
    Optional<BookLike> findByUserAndBook(User user, Book book);
    Optional<BookLike> findByBook(Book book);
//    Optional<BookLike> findByUser(User user);
}
