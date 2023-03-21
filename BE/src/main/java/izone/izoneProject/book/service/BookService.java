package izone.izoneProject.book.service;

import izone.izoneProject.book.dto.BookResponseDto;
import izone.izoneProject.book.entity.Book;
import izone.izoneProject.book.mapper.BookMapper;
import izone.izoneProject.book.repository.BookRepository;
import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class BookService {
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final BookMapper mapper;

    public Book createBook(Book book/*BookPostDto postDto*//*, long userId*/) {
//        User user = getUser(userId);
//        Book book = Book.post(postDto/*, user*/);

//        return bookRepository.save(book).getBookId();
        Book saveBook =bookRepository.save(book);

        return saveBook;
    }

    public Book updateBook(Book book) {
        Book foundBook = findBook(book.getBookId());
//        user 정보

        Optional.ofNullable(book.getDescription())
                .ifPresent(foundBook::setDescription);
        Optional.ofNullable(book.getCondition())
                .ifPresent(foundBook::setCondition);
        Optional.ofNullable(book.getExchange())
                .ifPresent(foundBook::setExchange);

        return bookRepository.save(foundBook);
    }

    @Transactional(readOnly = true)
    public Book findBook(long bookId) {
        Book foundBook = findVerifiedBookById(bookId);

        return foundBook;
    }

    public List<Book> searchByKeyword(String keyword) {
        List<Book> books = bookRepository.findByKeywordContaining(keyword);

        return  books;
    }

    public List<Book> findByIsbn(String isbn) {
        List<Book> books = bookRepository.findByIsbn(isbn);

        return books;
    }

    public void deleteBook(long bookId) {
        Book book = findVerifiedBookById(bookId);

        bookRepository.delete(book);
    }

    private Book findVerifiedBookById(long bookId) {
        Optional<Book> optionalBook = bookRepository.findById(bookId);
        Book foundBook = optionalBook.orElseThrow(RuntimeException::new);

        return foundBook;
    }

    public static <T> List<T> deduplication(final List<T> list, Function<? super T, ?> key){
        return list.stream().filter(deduplication(key))
                .collect(Collectors.toList());
    }
    private static <T> Predicate<T> deduplication(Function<? super T, ?>key){
        final Set<Object> set = ConcurrentHashMap.newKeySet();
        return predicate -> set.add(key.apply(predicate));
    }

    private User getUser(long userId) {
        return userRepository.findById(userId).orElseThrow(RuntimeException::new);
    }
}

