package izone.izoneProject.book.service;

import izone.izoneProject.book.entity.Book;
import izone.izoneProject.book.entity.BookLike;
import izone.izoneProject.book.repository.BookLikeRepository;
import izone.izoneProject.common.enums.LikeStatus;
import izone.izoneProject.common.exception.BusinessLogicException;
import izone.izoneProject.common.exception.ExceptionCode;
import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.repository.UserRepository;
import izone.izoneProject.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BookLikeService {
    private final BookLikeRepository bookLikeRepository;
    private final BookService bookService;
    private final UserService userService;
    private final UserRepository userRepository;

    public void likeCount(Book book) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(()->new RuntimeException("permission denied"));

        Optional<BookLike> optionalBookLike = bookLikeRepository.findByUserAndBook(user, book);
        BookLike bookLike = optionalBookLike.orElseGet(() -> {
            BookLike newBookLike = new BookLike();
            newBookLike.setUser(user);
            newBookLike.setBook(book);
            newBookLike.setStatus(LikeStatus.NONE);

            return bookLikeRepository.save(newBookLike);
        });

        if (bookLike.getStatus().toString().equals("LIKE")){
            throw new BusinessLogicException(ExceptionCode.VOTE_ALLOW_NOT);
        } else if (bookLike.getStatus().toString().equals("NONE")) {
            bookLike.setStatus(LikeStatus.LIKE);
        } else if (bookLike.getStatus().toString().equals("DISLIKE")) {
            bookLike.setStatus(LikeStatus.LIKE);
            book.setDislikeCount(book.getDislikeCount() + 1);
        }


        book.setLikeCount(book.getLikeCount() + 1);
    }

    public void dislikeCount(Book book) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(()->new RuntimeException("permission denied"));

        Optional<BookLike> optionalBookLike = bookLikeRepository.findByUserAndBook(user, book);
        BookLike bookLike = optionalBookLike.orElseGet(() -> {
            BookLike newBookLike = new BookLike();
            newBookLike.setUser(user);
            newBookLike.setBook(book);
            newBookLike.setStatus(LikeStatus.NONE);

            return bookLikeRepository.save(newBookLike);
        });

        if (bookLike.getStatus().toString().equals("DISLIKE")) {
            throw new BusinessLogicException(ExceptionCode.VOTE_ALLOW_NOT);
        } else if (bookLike.getStatus().toString().equals("NONE")) {
            bookLike.setStatus(LikeStatus.DISLIKE);
        } else if (bookLike.getStatus().toString().equals("LIKE")) {
            bookLike.setStatus(LikeStatus.DISLIKE);
            book.setLikeCount(book.getLikeCount() - 1);
        }

        book.setDislikeCount(book.getDislikeCount() - 1);
    }

    public BookLike findBookLike(Book book) {
        Optional<BookLike> findBookLike = bookLikeRepository.findByBook(book);
        return findBookLike.orElseGet(() -> createLike(book));
    }

    public BookLike createLike(Book book) {
        BookLike bookLike = BookLike.builder()
                .status(LikeStatus.NONE)
                .book(book)
                .build();

        return bookLikeRepository.save(bookLike);
    }
}
