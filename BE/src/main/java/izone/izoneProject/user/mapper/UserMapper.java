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
    @Mapping(target = "UserDto.Response.likeCount", expression = "java(user.getLikeList()!= null ? user.getLikeList().size():0)")
    @Mapping(target = "UserDto.Response.dislikeCount", expression = "java(user.getDislikeList()!= null ? user.getDislikeList().size():0)")
    @Mapping(target = "UserDto.Response.commentCount", expression = "java(user.getUserCommentList()!= null ? user.getUserCommentList().size():0)")
    UserDto.Response userToResponseDto(User user);
    List<UserDto.Response> usersToResponse (List<User> userList);

    UserComment postToComment(UserCommentDto.Post post);
    UserComment patchToComment(UserCommentDto.Patch patch);
    UserCommentDto.Response commentToResponse(UserComment userComment);
    List<UserCommentDto.Response> commentsToResponse(List<UserComment> commentList);
}
