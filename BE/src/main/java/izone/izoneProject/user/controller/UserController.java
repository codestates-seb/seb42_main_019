package izone.izoneProject.user.controller;

import izone.izoneProject.dto.PageDto;
import izone.izoneProject.user.dto.UserCommentDto;
import izone.izoneProject.user.dto.UserDto;
import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.entity.UserComment;
import izone.izoneProject.user.mapper.UserMapper;
import izone.izoneProject.user.service.UserService;
import izone.izoneProject.user.utils.Uri;
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
    public ResponseEntity deleteUser(@PathVariable("user-id") @Positive long userId){
        userService.deleteUser(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{user-id}/comment")
    public ResponseEntity postUserComment(@PathVariable("user-id")@Positive long userId,
                                          @RequestBody @Valid UserCommentDto.Post post){
        UserComment userComment = mapper.postToComment(post);
        List<UserComment> userComments = userService.createComment(userId, userComment);

        return new ResponseEntity<>(mapper.commentsToResponse(userComments), HttpStatus.OK);
    }

    @PatchMapping("/{user-id}/comment/{comment-id}")
    public ResponseEntity patchUserComment(@PathVariable("user-id")@Positive long userId,
                                           @PathVariable("comment-id")@Positive long commentId,
                                           @RequestBody @Valid UserCommentDto.Patch patch){
        UserComment userComment = mapper.patchToComment(patch);
        List<UserComment> userComments = userService.editComment(userComment, userId, commentId);

        return new ResponseEntity<>(mapper.commentsToResponse(userComments), HttpStatus.OK);
    }

    @GetMapping("/{user-id}/comment")
    public ResponseEntity getComments(@PathVariable("user-id")@Positive long userId,
                                      Pageable pageable){
        Page<UserComment> commentPage = userService.getComments(userId, pageable);
        List<UserComment> commentList = commentPage.getContent();

        return new ResponseEntity<>(new PageDto<>(mapper.commentsToResponse(commentList), commentPage), HttpStatus.OK);
    }
    @DeleteMapping("/{user-id}/comment/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("user-id")@Positive long userId,
                                        @PathVariable("comment-id")@Positive long commentId){
        userService.deleteComment(userId, commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
