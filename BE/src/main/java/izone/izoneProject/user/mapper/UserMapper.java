package izone.izoneProject.user.mapper;

import izone.izoneProject.user.dto.UserCommentDto;
import izone.izoneProject.user.dto.UserDto;
import izone.izoneProject.user.entity.User;
import izone.izoneProject.user.entity.UserComment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User postDtoToUser(UserDto.Post post);
    User patchDtoToUser(UserDto.Patch patch);
    @Mapping(target = "commentCount", expression = "java(user.getUserCommentList()!= null ? user.getUserCommentList().size():0)")
    UserDto.Response userToResponseDto(User user);
    List<UserDto.Response> usersToResponse (List<User> userList);

    UserComment postToComment(UserCommentDto.Post post);
    UserComment patchToComment(UserCommentDto.Patch patch);
    @Mapping(source =  "recipient.name", target = "recipientName")
    @Mapping(source = "user.name", target = "senderName")
    UserCommentDto.Response commentToResponse(UserComment userComment);
    List<UserCommentDto.Response> commentsToResponse(List<UserComment> commentList);

    @Mapping(source = "userId", target = "likerId")
    UserDto.UserLikeResponse userToUserLikeResponse(User liker);
    @Mapping(source = "userId", target = "likerId")
    UserDto.UserDislikeResponse userToUserDislikeResponse(User liker);
}
