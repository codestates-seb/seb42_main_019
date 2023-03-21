package izone.izoneProject.user.controller;

import izone.izoneProject.book.dto.BookDislikeResponseDto;
import izone.izoneProject.book.dto.BookLikeResponseDto;
import izone.izoneProject.book.entity.Book;
import izone.izoneProject.common.dto.PageDto;
import izone.izoneProject.common.utils.Uri;
import izone.izoneProject.user.dto.UserCommentDto;
import izone.izoneProject.user.dto.UserDto;
import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.entity.UserComment;
import izone.izoneProject.user.mapper.UserMapper;
import izone.izoneProject.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final String DEFAULT_URI = "/user/";
    private final UserService userService;
    private final UserMapper mapper;

    @PostMapping
    public ResponseEntity postUser(@RequestBody @Valid UserDto.Post post) {
        User postUser = mapper.postDtoToUser(post);
        User createdUser = userService.createUser(postUser);
        URI location = Uri.createUri(DEFAULT_URI, Long.toString(createdUser.getUserId()));
        return ResponseEntity.created(location).build();
    }

    @PatchMapping("/{user-id}")
    public ResponseEntity patchUser(@PathVariable("user-id") @Positive long userId,
                                    @RequestBody @Valid UserDto.Patch patch) {
        User user = mapper.patchDtoToUser(patch);
        user.setUserId(userId);
        User editUser = userService.editUser(user);

        return new ResponseEntity<>(mapper.userToResponseDto(editUser), HttpStatus.OK);
    }

    @GetMapping("/{user-id}")
    public ResponseEntity getUser(@PathVariable("user-id") @Positive long userId) {
        User user = userService.getUser(userId);

        return new ResponseEntity<>(mapper.userToResponseDto(user), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getUsers(Pageable pageable) {
        Page<User> userPage = userService.getUsers(pageable);
        List<User> userList = userPage.getContent();

        return new ResponseEntity<>(new PageDto<>(mapper.usersToResponse(userList), userPage), HttpStatus.OK);
    }

    @DeleteMapping("/{user-id}")
    public ResponseEntity deleteUser(@PathVariable("user-id") @Positive long userId) {
        userService.deleteUser(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{user-id}/comment")
    public ResponseEntity postComment(@PathVariable("user-id") @Positive long userId,
                                          @RequestBody @Valid UserCommentDto.Post post) {
        UserComment userComment = mapper.postToComment(post);
        List<UserComment> userComments = userService.createComment(userId, userComment);
        return new ResponseEntity<>(mapper.commentsToResponse(userComments), HttpStatus.CREATED);
    }

    @PatchMapping("/{user-id}/comment/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("user-id") @Positive long userId,
                                           @PathVariable("comment-id") @Positive long commentId,
                                           @RequestBody @Valid UserCommentDto.Patch patch) {
        UserComment userComment = mapper.patchToComment(patch);
        userComment.setCommentId(commentId);
        List<UserComment> userComments = userService.editComment(userComment, userId);

        return new ResponseEntity<>(mapper.commentsToResponse(userComments), HttpStatus.OK);
    }

    @GetMapping("/{user-id}/comment")
    public ResponseEntity getComments(@PathVariable("user-id") @Positive long userId,
                                      Pageable pageable) {
        Page<UserComment> commentPage = userService.getComments(userId, pageable);
        List<UserComment> commentList = commentPage.getContent();

        return new ResponseEntity<>(new PageDto<>(mapper.commentsToResponse(commentList), commentPage), HttpStatus.OK);
    }

    @DeleteMapping("/{user-id}/comment/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("user-id") @Positive long userId,
                                        @PathVariable("comment-id") @Positive long commentId) {
        List<UserComment> userComments = userService.deleteComment(userId, commentId);

        return new ResponseEntity<>(mapper.commentsToResponse(userComments), HttpStatus.OK);
    }

    @PostMapping("/{liker-id}/like")
    public ResponseEntity<?> userLike (/*long userId,*/
                                       @PathVariable("liker-id") @Positive long likerId) {
//        User user = userService.verifyUser(userId);
        User liker = userService.verifyUser(likerId);
//        userService.likeCount(user, liker);
        userService.likeCount(/*user, */liker);
        UserDto.UserLikeResponse response = mapper.userToUserLikeResponse(liker);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{liker-id}/dislike")
    public ResponseEntity<?> userDislike (/*long userId,*/
                                         @PathVariable("liker-id") @Positive long likerId) {
//        User user = userService.verifyUser(userId);
        User liker = userService.verifyUser(likerId);
//        userService.dislikeCount(user, liker);
        userService.dislikeCount(/*user, */liker);
        UserDto.UserDislikeResponse response = mapper.userToUserDislikeResponse(liker);

        return ResponseEntity.ok(response);
    }
}
