package izone.izoneProject.book.controller;

import izone.izoneProject.book.dto.BookCommentDto;
import izone.izoneProject.book.entity.BookComment;
import izone.izoneProject.book.mapper.BookCommentMapper;
import izone.izoneProject.book.service.BookCommentService;
import izone.izoneProject.dto.PageDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/books")
@Validated
@CrossOrigin("*")
@RequiredArgsConstructor
public class BookCommentController {
    private final BookCommentService bookCommentService;
    private final BookCommentMapper bookCommentMapper;

    //해당 id를 가진 페이제이 코멘트 등록
    @PostMapping("/{book-id}/comment")
    public ResponseEntity postBookComment(@PathVariable("book-id") @Positive long bookId,
                                          @RequestBody @Valid BookCommentDto.Post post) {
        BookComment bookComment = bookCommentMapper.postToBookComment(post); //content
        BookComment createdComment = bookCommentService.createBookComment(bookId, bookComment);

        return new ResponseEntity<>(bookCommentMapper.commentToResponse(createdComment), HttpStatus.CREATED);
    }

    //코멘트 수정
    @PatchMapping("/{book-id}/comment/{comment-id}")
    public ResponseEntity patchBookComment(@PathVariable("book-id") @Positive long bookId,
                                           @PathVariable("comment-id") @Positive long commentId,
                                           @RequestBody BookCommentDto.Patch patch) {

        BookComment bookComment = bookCommentMapper.patchToBookComment(patch); //content
//        BookComment editBookComment = bookCommentService.editBookComment(bookId, commentId, bookComment);
        bookComment.setBookCommentId(commentId); //content, bookcoId
        BookComment editBookComment = bookCommentService.editBookComment(bookId, bookComment); //bookcomment null, id, content


        return new ResponseEntity<>(bookCommentMapper.commentToResponse(editBookComment), HttpStatus.OK);
    }

    @DeleteMapping("/{book-id}/comment/{comment-id}")
    public ResponseEntity deleteBookComment(@PathVariable("book-id") @Positive long bookId,
                                            @PathVariable("comment-id") @Positive long commentId) {

        bookCommentService.deleteComment(/*bookId, */commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{book-id}/comment/{comment-id}")
    public ResponseEntity getBookComment(@PathVariable("book-id") @Positive long bookId,
                                         @PathVariable("comment-id") @Positive long commentId) {

        BookComment findBookComment = bookCommentService.getBookComment(commentId);

        return new ResponseEntity<>(bookCommentMapper.commentToResponse(findBookComment),HttpStatus.OK);
    }
    @GetMapping("/{book-id}/comment")
    public ResponseEntity getBookComments(@PathVariable("book-id") @Positive long bookId, Pageable pageable) {

        Page<BookComment> commentPage = bookCommentService.getBookComments(bookId,pageable);
        List<BookComment> comments = commentPage.getContent();

        return new ResponseEntity<>(new PageDto<>(bookCommentMapper.commentsToResponse(comments), commentPage), HttpStatus.OK);
    }
}
