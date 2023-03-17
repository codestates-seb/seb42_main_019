package izone.izoneProject.book.service;

import izone.izoneProject.book.entity.Book;
import izone.izoneProject.book.entity.BookComment;
import izone.izoneProject.book.repository.BookCommentRepository;
import izone.izoneProject.book.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional //알아서 작업해
public class BookCommentService {
    private final BookCommentRepository commentRepository;
    private final BookRepository bookRepository;

    //bookComment등록
    public BookComment createBookComment(long bookId, BookComment bookComment) {
        Book book = findBook(bookId);
        bookComment.setBook(book);
        return commentRepository.save(bookComment);//create는 save만 있으면 됨
    }

    public BookComment editBookComment(long bookId, BookComment bookComment){
        Book book = findBook(bookId);
        BookComment foundComment = findComment(bookComment.getBookCommentId());

        foundComment.setContent(bookComment.getContent());

        return commentRepository.save(bookComment);
    }
    /*
     * bookComment 데이터를 가져오는 메서드
     * */
    public BookComment getBookComment(long commentId){
        return findComment(commentId); //이걸 왜써야지?
    }


    public void deleteComment(long bookId, long commentId) {
        Book foundBook = findBook(bookId);
        BookComment foundComment = findComment(commentId);

        BookComment verifiedComment = foundBook.getBookCommentList().stream()
                .filter(c -> c.getBookCommentId() == commentId)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("comment is not the same"));

        commentRepository.deleteById(verifiedComment.getBookCommentId());
    }

    public static String test(int num) {
        return "ok";
    }

    public BookComment findComment(long commentId) {
        Optional<BookComment> findByCommentId = commentRepository.findById(commentId);
        BookComment foundComment = findByCommentId.orElseThrow(()-> new RuntimeException("comment가 존재하지않습니다."));

        return foundComment;
    }

    public Book findBook(long bookId){
        Optional<Book> findByCommentId = bookRepository.findById(bookId);
        Book foundBook = findByCommentId.orElseThrow(()-> new RuntimeException("책이 존재하지않습니다."));

        return foundBook;
    }
}

