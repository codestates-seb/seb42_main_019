package izone.izoneProject.user.mapper;

import izone.izoneProject.user.dto.UserDto;
import izone.izoneProject.user.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface UserMapper {
    User postDtoToUser(UserDto.Post post);
    User patchDtoToUser(UserDto.Patch patch);
    @Mapping(target = "UserDto.Response.likeCount", expression = "java(user.getLikeList()!= null ? user.getLikeList().size():0)")
    @Mapping(target = "UserDto.Response.dislikeCount", expression = "java(user.getDislikeList()!= null ? user.getDislikeList().size():0)")
    @Mapping(target = "UserDto.Response.commentCount", expression = "java(user.getUserCommentList()!= null ? user.getUserCommentList().size():0)")
    UserDto.Response userToResponseDto(User user);
}
