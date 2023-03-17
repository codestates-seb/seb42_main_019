package izone.izoneProject.Book.controller;

import izone.izoneProject.Book.dto.BookCommentDto;
import izone.izoneProject.Book.entity.BookComment;
import izone.izoneProject.Book.mapper.BookCommentMapper;
import izone.izoneProject.Book.service.BookCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

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
        BookComment bookComment = bookCommentMapper.postToBookComment(post);
        BookComment createdComment = bookCommentService.createBookComment(bookId, bookComment);

        return new ResponseEntity<>(bookCommentMapper.commentToResponse(createdComment), HttpStatus.CREATED);
    }

    //코멘트 수정
    @PatchMapping("/{book-id}/comment/{comment-id}")
    public ResponseEntity patchBookComment(@PathVariable("book-id") @Positive long bookId,
                                           @PathVariable("comment-id") @Positive long commentId,
                                           @RequestBody BookCommentDto.Patch patch) {

        BookComment bookComment = bookCommentMapper.patchToBookComment(patch);
        BookComment editBookComment = bookCommentService.editBookComment(bookId, commentId, bookComment);


        return new ResponseEntity<>(bookCommentMapper.commentToResponse(editBookComment), HttpStatus.OK);
    }

    @DeleteMapping("/{book-id}/comment/{comment-id}")
    public ResponseEntity deleteBookComment(@PathVariable("book-id") @Positive long bookId,
                                            @PathVariable("comment-id") @Positive long commentId) {

        bookCommentService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{book-id}/comment/{comment-id}")
    public ResponseEntity getBookComment(@PathVariable("book-id") @Positive long bookId,
                                         @PathVariable("comment-id") @Positive long commentId) {

        BookComment findBookComment = bookCommentService.getBookComment(commentId);

        return new ResponseEntity<>(bookCommentMapper.commentToResponse(findBookComment),HttpStatus.OK);
    }

}
