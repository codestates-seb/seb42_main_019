package izone.izoneProject.book.service;

import izone.izoneProject.book.entity.Book;
import izone.izoneProject.book.entity.BookComment;
import izone.izoneProject.book.repository.BookCommentRepository;
import izone.izoneProject.book.repository.BookRepository;
import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.repository.UserRepository;
import izone.izoneProject.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final UserService userService;
    private final BookCommentRepository bookCommentRepository;

    public Book createBook(Book book) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(()->new RuntimeException("permission denied"));
        book.setUser(user);

        return bookRepository.save(book);
    }

    public Book updateBook(Book book) {
        Book foundBook = findBook(book.getBookId());
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if (!userService.verifyUser(foundBook.getUser().getUserId()).getEmail().equals(principal))
            throw new RuntimeException("permission denied");

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
        List<BookComment> totalComments = bookCommentRepository.findByIsbn(foundBook.getIsbn());
        foundBook.setBookCommentList(totalComments);

        return foundBook;
    }

    public List<Book> searchByKeyword(String keyword) {
        List<Book> books = bookRepository.findByKeywordContaining(keyword);

        return books;
    }

    public List<Book> findByIsbn(String isbn) {
        List<Book> books = bookRepository.findByIsbn(isbn);
        int totalLike = books.stream()
                .map(Book::getLikeCount)
                .mapToInt(Integer::intValue).sum();
        books.stream().forEach(h -> h.setTotalLikeCount(totalLike));

        int totalDislike = books.stream()
                .map(Book::getDislikeCount)
                .mapToInt(Integer::intValue).sum();
        books.stream().forEach(h -> h.setTotalDislikeCount(totalDislike));

        return books;
    }

    public void deleteBook(long bookId) {
        Book book = findVerifiedBookById(bookId);
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if (!userService.verifyUser(book.getUser().getUserId()).getEmail().equals(principal))
            throw new RuntimeException("permission denied");

        bookRepository.delete(book);
    }

    public Book findVerifiedBookById(long bookId) {
        Optional<Book> optionalBook = bookRepository.findById(bookId);
        Book foundBook = optionalBook.orElseThrow(RuntimeException::new);

        return foundBook;
    }

    public static <T> List<T> deduplication(final List<T> list, Function<? super T, ?> key) {
        return list.stream().filter(deduplication(key))
                .collect(Collectors.toList());
    }

    private static <T> Predicate<T> deduplication(Function<? super T, ?> key) {
        final Set<Object> set = ConcurrentHashMap.newKeySet();
        return predicate -> set.add(key.apply(predicate));
    }
}

