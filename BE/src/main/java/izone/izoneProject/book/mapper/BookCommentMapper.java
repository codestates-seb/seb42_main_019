package izone.izoneProject.book.mapper;

import izone.izoneProject.book.dto.BookCommentDto;
import izone.izoneProject.book.entity.BookComment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookCommentMapper {
    BookComment postToBookComment(BookCommentDto.Post post);
    BookComment patchToBookComment(BookCommentDto.Patch patch);
    BookCommentDto.Response commentToResponse(BookComment bookComment);

}