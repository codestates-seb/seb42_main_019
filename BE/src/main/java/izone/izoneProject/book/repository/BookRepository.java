package izone.izoneProject.book.repository;

import izone.izoneProject.book.entity.Book;
import izone.izoneProject.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    @Query(value = "SELECT b FROM Book b WHERE b.isbn = :isbn")
    List<Book> findByIsbn(@Param("isbn") String isbn);
    @Query(value = "SELECT b FROM Book b WHERE b.title LIKE %:keyword%")
    List<Book> findByKeywordContaining(@Param("keyword") String keyword);
    List<Book> findByUser(User user);
}
