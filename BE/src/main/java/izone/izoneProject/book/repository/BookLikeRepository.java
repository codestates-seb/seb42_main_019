package izone.izoneProject.book.repository;

import izone.izoneProject.book.entity.Book;
import izone.izoneProject.book.entity.BookLike;
import izone.izoneProject.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookLikeRepository extends JpaRepository<BookLike, Long> {
//    Optional<BookLike> findByUserAndBook(User user, Book book);
    Optional<BookLike> findByBook(Book book);
}
