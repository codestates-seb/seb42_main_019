package izone.izoneProject.user.service;

import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.entity.UserComment;
import izone.izoneProject.user.repository.CommentRepository;
import izone.izoneProject.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    public User createUser(User user) {
        if (checkEmail(user.getEmail())) {
            throw new RuntimeException("email is exist");
        } else if (checkName(user.getName())) {
            throw new RuntimeException("name is exist");
        }
        return userRepository.save(user);
    }

    public User editUser(User user) {
        User foundUser = verifyUser(user.getUserId());
        Optional.ofNullable(user.getPassword())
                .ifPresent(password -> foundUser.setPassword(password));
        Optional.ofNullable(user.getRegion())
                .ifPresent(region -> foundUser.setRegion(region));

        return foundUser;
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

        comment.setUser(foundUser);
        foundUser.getUserCommentList().add(comment);
        commentRepository.save(comment);
        return commentRepository.findByUserId(foundUser.getUserId());
    }

    public List<UserComment> editComment(UserComment comment, long userId, long commentId) {
        User foundUser = verifyUser(userId);
        UserComment foundComment = verifyComment(commentId);
//        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
//        if (!verifiedComment.getUser().getEmail().equals(principal)) {
//            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION_EDITING_POST);
//        }

        UserComment verifiedComment = foundUser.getUserCommentList().stream()
                .filter(c -> c.getCommentId() == commentId)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("comment is not the same"));

        verifiedComment.setContent(comment.getContent());
        commentRepository.save(verifiedComment);

        return commentRepository.findByUserId(foundUser.getUserId());
    }

    public Page<UserComment> getComments(long userId, Pageable pageable) {
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), pageable.getSort());
        return commentRepository.findByUserId(userId, pageRequest);
    }

    public void deleteComment(long userId, long commentId) {
        User foundUser = verifyUser(userId);
        UserComment userComment = verifyComment(commentId);

        if (!foundUser.getUserCommentList().contains(userComment))
            throw new RuntimeException("comment not found");

        UserComment verifiedComment = foundUser.getUserCommentList().stream()
                .filter(c -> c.getCommentId() == commentId)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("comment is not the same"));

        commentRepository.deleteById(verifiedComment.getCommentId());
    }

    public boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public boolean checkName(String name) {
        return userRepository.existsByName(name);
    }

    public User verifyUser(long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        User foundUser = optionalUser.orElseThrow(() -> new RuntimeException("user not found"));
        return foundUser;
    }

    public UserComment verifyComment(long commentId) {

        Optional<UserComment> optionalUserComment = commentRepository.findById(commentId);
        UserComment findComment =
                optionalUserComment.orElseThrow(() -> new RuntimeException("comment not found"));

        return findComment;
    }

}
