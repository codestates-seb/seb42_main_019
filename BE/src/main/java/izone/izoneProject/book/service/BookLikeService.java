package izone.izoneProject.book.service;

import izone.izoneProject.book.entity.Book;
import izone.izoneProject.book.entity.BookLike;
import izone.izoneProject.book.repository.BookLikeRepository;
import izone.izoneProject.common.enums.LikeStatus;
import izone.izoneProject.common.exception.BusinessLogicException;
import izone.izoneProject.common.exception.ExceptionCode;
import izone.izoneProject.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BookLikeService {
    private final BookLikeRepository bookLikeRepository;

    public void likeCount(/*User user, */Book book) {
        BookLike bookLike = findBookLike(/*user, */book);

        if (bookLike.getStatus().toString().equals("LIKE")) {
            throw new BusinessLogicException(ExceptionCode.VOTE_ALLOW_NOT);
        } else if (bookLike.getStatus().toString().equals("NONE")) {
            bookLike.setStatus(LikeStatus.LIKE);
        } else if (bookLike.getStatus().toString().equals("DISLIKE")) {
            bookLike.setStatus(LikeStatus.LIKE);
            book.setDislikeCount(book.getDislikeCount() + 1);
        }

        book.setLikeCount(book.getLikeCount() + 1);
    }

    public void dislikeCount(/*User user, */Book book) {
        BookLike bookLike = findBookLike(/*user, */book);

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

    public BookLike findBookLike(/*User user, */Book book) {
//        Optional<BookLike> findBookLike = bookLikeRepository.findByUserAndBook(user, book);
        Optional<BookLike> findBookLike = bookLikeRepository.findByBook(book);
        return findBookLike.orElseGet(() -> createLike(/*user, */book));
    }

    public BookLike createLike(/*User user, */Book book) {
        BookLike bookLike = BookLike.builder()
                .status(LikeStatus.NONE)
//                .user(user)
                .book(book)
                .build();

        return bookLikeRepository.save(bookLike);
    }
}
