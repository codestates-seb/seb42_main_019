package izone.izoneProject.user.service;

import izone.izoneProject.security.utils.CustomAuthorityUtils;
import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.entity.UserComment;
import izone.izoneProject.user.repository.CommentRepository;
import izone.izoneProject.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final PasswordEncoder encoder;
    private final CustomAuthorityUtils authorityUtils;

    public User createUser(User user) {
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
        optionalUser.ifPresent(u-> new RuntimeException("user already exist"));
        if (checkName(user.getName())) {
            throw new RuntimeException("name is exist");
        }
        user.setPassword(encoder.encode(user.getPassword()));
        List<String> roles = authorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);


        return userRepository.save(user);
    }

    public User editUser(User user) {
        User foundUser = verifyUser(user.getUserId());

        Optional.ofNullable(user.getPassword())
                .ifPresent(password -> foundUser.setPassword(password));
        Optional.ofNullable(user.getRegion())
                .ifPresent(region -> foundUser.setRegion(region));

        return userRepository.save(foundUser);
    }

    public User getUser(long userId) {
        User foundUser = verifyUser(userId);

        return foundUser;
    }

    public Page<User> getUsers(Pageable pageable) {
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), pageable.getSort());
        return userRepository.findAll(pageRequest);
    }

    public void deleteUser(long userId) {
        verifyUser(userId);
        userRepository.deleteById(userId);
    }

    public List<UserComment> createComment(long userId, UserComment comment) {
        User foundUser = verifyUser(userId);

        comment.setRecipient(foundUser);
        foundUser.getUserCommentList().add(comment);
        commentRepository.save(comment);
        return commentRepository.findByUserId(foundUser.getUserId());
    }

    public List<UserComment> editComment(UserComment comment, long userId) {
        User foundUser = verifyUser(userId);
        UserComment foundComment = verifyComment(comment.getCommentId());
//        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
//        if (!verifiedComment.getUser().getEmail().equals(principal)) {
//            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_EDITING_POST);
//        }
        foundComment.setContent(comment.getContent());
        commentRepository.save(foundComment);

        return commentRepository.findByUserId(foundUser.getUserId());
    }

    public Page<UserComment> getComments(long userId, Pageable pageable) {
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), pageable.getSort());
        return commentRepository.findByUserId(userId, pageRequest);
    }

    public List<UserComment> deleteComment(long userId, long commentId) {
        User foundUser = verifyUser(userId);
        UserComment userComment = verifyComment(commentId);

        commentRepository.deleteAllByIdInBatch(Collections.singleton(userComment.getCommentId()));
        return commentRepository.findByUserId(foundUser.getUserId());
    }

    public boolean checkName(String name) {
        return userRepository.existsByName(name);
    }

    public UserComment verifyComment(long commentId) {

        Optional<UserComment> optionalUserComment = commentRepository.findById(commentId);
        UserComment findComment = optionalUserComment.orElseThrow(() -> new RuntimeException("comment not found"));
        return findComment;
    }

    public User verifyUser(long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User foundUser = optionalUser.orElseThrow(() -> new RuntimeException("user not found"));
        return foundUser;
    }

    public User verifyEmail(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        User foundUser = optionalUser.orElseThrow(() -> new RuntimeException("user not found"));
        return foundUser;
    }

}
