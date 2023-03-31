package izone.izoneProject.book.mapper;

import izone.izoneProject.book.dto.*;
import izone.izoneProject.book.entity.Book;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BookMapper {
    Book postDtotoBook(BookPostDto postDto);
    Book patchDtoToBook(BookPatchDto patchDto);
    BookResponseDto bookToResponseDto(Book book);
    List<BookResponseDto> bookToResponseDtos(List<Book> bookList);
    BookLikeResponseDto bookToBookLikeResponseDto(Book book);
    BookDislikeResponseDto bookToBookDislikeResponseDto(Book book);
}
