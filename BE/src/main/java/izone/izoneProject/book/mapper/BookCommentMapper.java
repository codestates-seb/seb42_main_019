package izone.izoneProject.book.mapper;

import izone.izoneProject.book.dto.BookCommentDto;
import izone.izoneProject.book.entity.BookComment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BookCommentMapper {
    BookComment postToBookComment(BookCommentDto.Post post);
    BookComment patchToBookComment(BookCommentDto.Patch patch);
    @Mapping(source = "book.bookId", target = "bookId")
    @Mapping(source = "user.userId", target = "userId")
    @Mapping(source = "user.name", target = "userName")
    @Mapping(source = "book.title", target = "bookName")
    BookCommentDto.Response commentToResponse(BookComment bookComment);
    List<BookCommentDto.Response> commentsToResponse(List<BookComment> comments);

}