package izone.izoneProject.book.service;

import izone.izoneProject.book.entity.Book;
import izone.izoneProject.book.repository.BookRepository;
import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class BookService {
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Transactional
    public Book createBook(Book book/*BookPostDto postDto*//*, long userId*/) {
//        User user = getUser(userId);
//        Book book = Book.post(postDto/*, user*/);

//        return bookRepository.save(book).getBookId();
        Book saveBook =bookRepository.save(book);

        return saveBook;
    }

    @Transactional
    public Book updateBook(Book book) {
        Book foundBook = findBook(book.getBookId());
//        user 정보

        Optional.ofNullable(book.getDescription())
                .ifPresent(foundBook::setDescription);
        Optional.ofNullable(book.getCondition())
                .ifPresent(foundBook::setDescription);
        Optional.ofNullable(book.getExchange())
                .ifPresent(foundBook::setExchange);

        return bookRepository.save(foundBook);
    }

    @Transactional(readOnly = true)
    public Book findBook(long bookId) {
        Book foundBook = findVerifiedBookById(bookId);

        return foundBook;
    }

    private Book findVerifiedBookById(long bookId) {
        Optional<Book> optionalBook = bookRepository.findById(bookId);
        Book foundBook = optionalBook.orElseThrow(() -> new RuntimeException());

        return foundBook;
    }

    private User getUser(long userId) {
        return userRepository.findById(userId).orElseThrow(RuntimeException::new);
    }
}
