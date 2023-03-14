package izone.izoneProject.user.controller;

import izone.izoneProject.user.dto.UserDto;
import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.mapper.UserMapper;
import izone.izoneProject.user.service.UserService;
import izone.izoneProject.user.utils.Uri;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/user")
@Validated
@RequiredArgsConstructor
public class UserController {
    private final String DEFAULT_URI ="/user";
    private final UserService userService;
    private final UserMapper mapper;

    @PostMapping
    public ResponseEntity postUser(@RequestBody @Valid UserDto.Post post) {
        User postUser = mapper.postDtoToUser(post);
        User createdUser = userService.createUser(postUser);
        URI location = Uri.createUri(DEFAULT_URI, Long.toString(createdUser.getUserId()));
        return ResponseEntity.created(location).build();
    }
}
