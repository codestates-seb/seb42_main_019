package izone.izoneProject.book.repository;

import izone.izoneProject.book.entity.Book;
import izone.izoneProject.book.entity.BookComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookCommentRepository extends JpaRepository<BookComment, Long> {
    @Query(value = "SELECT * FROM book_comment WHERE book_id = :bookId", nativeQuery = true)
    Page<BookComment> findByBookId(long bookId, Pageable pageable);
    @Query(value = "SELECT * FROM book_comment WHERE isbn = :isbn", nativeQuery = true)
    List<BookComment> findByIsbn(String isbn);
    @Query(value = "SELECT * FROM book_comment WHERE isbn = :isbn", nativeQuery = true)
    Page<BookComment> findByIsbn(String isbn, Pageable pageable);

}
