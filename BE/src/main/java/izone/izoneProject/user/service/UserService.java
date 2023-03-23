package izone.izoneProject.user.service;

import izone.izoneProject.security.utils.CustomAuthorityUtils;
import izone.izoneProject.common.enums.LikeStatus;
import izone.izoneProject.common.exception.BusinessLogicException;
import izone.izoneProject.common.exception.ExceptionCode;
import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.entity.UserComment;
import izone.izoneProject.user.entity.UserLike;
import izone.izoneProject.user.repository.CommentRepository;
import izone.izoneProject.user.repository.UserLikeRepository;
import izone.izoneProject.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final UserLikeRepository userLikeRepository;
    private final PasswordEncoder encoder;
    private final CustomAuthorityUtils authorityUtils;

    public User createUser(User user) {
        Optional<User> optionalUser = userRepository.findByEmail(user.getEmail());
        optionalUser.ifPresent(u-> new RuntimeException("user already exist"));
        if (checkName(user.getName())) {
            throw new RuntimeException("name already exist");
        }
        user.setPassword(encoder.encode(user.getPassword()));
        List<String> roles = authorityUtils.createRoles(user.getEmail());
        user.setRoles(roles);

        return userRepository.save(user);
    }

    public User editUser(User user) {
        User foundUser = verifyUser(user.getUserId());
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if (!foundUser.getEmail().equals(principal))
            throw new RuntimeException("permission denied");

        Optional.ofNullable(user.getPassword())
                .ifPresent(password -> foundUser.setPassword(password));
        Optional.ofNullable(user.getRegion())
                .ifPresent(region -> foundUser.setRegion(region));

        return userRepository.save(foundUser);
    }

    public User getUser(long userId) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if (!verifyUser(userId).getEmail().equals(principal))
            throw new RuntimeException("permission denied");

        User foundUser = verifyUser(userId);

        return foundUser;
    }

    public Page<User> getUsers(Pageable pageable) {
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), pageable.getSort());
        return userRepository.findAll(pageRequest);
    }

    public void deleteUser(long userId) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if (!verifyUser(userId).getEmail().equals(principal))
            throw new RuntimeException();
        userRepository.deleteById(userId);
    }

    public List<UserComment> createComment(long userId, UserComment comment) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<User> optionalUser = userRepository.findByEmail(principal);
        User user = optionalUser.orElseThrow(()->new RuntimeException("permission denied"));
        User foundUser = verifyUser(userId);

        comment.setUser(user);
        comment.setRecipient(foundUser);
        foundUser.getUserCommentList().add(comment);
        commentRepository.save(comment);
        return commentRepository.findByUserId(foundUser.getUserId());
    }

    public List<UserComment> editComment(UserComment comment, long userId) {
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if (!verifyUser(comment.getUser().getUserId()).getEmail().equals(principal))
            throw new RuntimeException("permission denied");
        User recipient = verifyUser(userId);
        UserComment foundComment = verifyComment(comment.getCommentId());

        foundComment.setContent(comment.getContent());
        commentRepository.save(foundComment);

        return commentRepository.findByUserId(recipient.getUserId());
    }

    public Page<UserComment> getComments(long userId, Pageable pageable) {
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber() - 1, pageable.getPageSize(), pageable.getSort());
        return commentRepository.findByUserId(userId, pageRequest);
    }

    public List<UserComment> deleteComment(long userId, long commentId) {
        UserComment comment = verifyComment(commentId);
        String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if (!verifyUser(comment.getUser().getUserId()).getEmail().equals(principal))
            throw new RuntimeException("permission denied");

        User recipient = verifyUser(userId);

        commentRepository.deleteAllByIdInBatch(Collections.singleton(comment.getCommentId()));
        return commentRepository.findByUserId(recipient.getUserId());
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

    public void likeCount(/*User user, */User liker) {
//        UserLike userLike = findUserLike(user, liker);
        UserLike userLike = findUserLike(/*user, */liker);

        if (userLike.getStatus().toString().equals("LIKE")) {
            throw new BusinessLogicException(ExceptionCode.VOTE_ALLOW_NOT);
        } else if (userLike.getStatus().toString().equals("NONE")) {
            userLike.setStatus(LikeStatus.LIKE);
        } else if (userLike.getStatus().toString().equals("DISLIKE")) {
            userLike.setStatus(LikeStatus.LIKE);
            liker.setDislikeCount(liker.getDislikeCount() + 1);
        }
        liker.setLikeCount(liker.getLikeCount() + 1);
    }

    public void dislikeCount(/*User user, */User liker) {
//        UserLike userLike = findUserLike(user, liker);
        UserLike userLike = findUserLike(/*user, */liker);

        if (userLike.getStatus().toString().equals("DISLIKE")) {
            throw new BusinessLogicException(ExceptionCode.VOTE_ALLOW_NOT);
        } else if (userLike.getStatus().toString().equals("NONE")) {
            userLike.setStatus(LikeStatus.DISLIKE);
        } else if (userLike.getStatus().toString().equals("LIKE")) {
            userLike.setStatus(LikeStatus.DISLIKE);
            liker.setLikeCount(liker.getLikeCount() - 1);
        }

        liker.setDislikeCount(liker.getDislikeCount() - 1);
    }

    public UserLike findUserLike(/*User user, */User liker) {
//        Optional<UserLike> findUserLike = userLikeRepository.findByLikerAndUser(user, liker);
//        return findUserLike.orElseGet(() -> createLike(user, liker));

        Optional<UserLike> findUserLike = userLikeRepository.findByLiker(/*user, */liker);
        return findUserLike.orElseGet(() -> createLike(/*user, */liker));
    }

    public UserLike createLike(/*User user, */User liker) {
        UserLike userLike = UserLike.builder()
                .status(LikeStatus.NONE)
//                .liker(user)
                .user(liker)
                .build();

        return userLikeRepository.save(userLike);
    }

}
