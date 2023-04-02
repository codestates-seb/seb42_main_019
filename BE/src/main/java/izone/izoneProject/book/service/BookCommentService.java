package izone.izoneProject.book.service;

import izone.izoneProject.book.entity.Book;
import izone.izoneProject.book.entity.BookComment;
import izone.izoneProject.book.repository.BookCommentRepository;
import izone.izoneProject.book.repository.BookRepository;
import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class BookCommentService {
    private final BookCommentRepository commentRepository;
    private final BookRepository bookRepository;
    private final BookService bookService;
    private final UserRepository userRepository;

    //bookComment등록
    public BookComment createBookComment(long bookId, BookComment bookComment) {
        Book book = findBook(bookId);
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(()->new RuntimeException("permission denied"));
        bookComment.setUser(user);
        bookComment.setBook(book);
        bookComment.setIsbn(book.getIsbn());

        return commentRepository.save(bookComment);//create는 save만 있으면 됨
    }

    public BookComment editBookComment(BookComment bookComment){
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(()->new RuntimeException("permission denied"));
        BookComment foundComment = findComment(bookComment.getBookCommentId());
        foundComment.setUser(user);
        foundComment.setContent(bookComment.getContent());
        return commentRepository.save(foundComment);
    }
    /*
     * bookComment 데이터를 가져오는 메서드
     * */
    public BookComment getBookComment(long commentId){
        return findComment(commentId);
    }
    public Page<BookComment> getBookComments(long bookId, Pageable pageable){
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), pageable.getSort());
        Book foundBook = bookService.findBook(bookId);
        String isbn = foundBook.getIsbn();

        return commentRepository.findByIsbn(isbn, pageRequest);
    }

    public void deleteComment(long commentId) {
        BookComment comment = findComment(commentId);
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(()->new RuntimeException("permission denied"));
        comment.setUser(user);

        commentRepository.delete(comment);
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

