package izone.izoneProject.book.mapper;

import izone.izoneProject.book.dto.BookPatchDto;
import izone.izoneProject.book.dto.BookPostDto;
import izone.izoneProject.book.dto.BookResponseDto;
import izone.izoneProject.book.entity.Book;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookMapper {
    Book postDtotoBook(BookPostDto postDto);
    Book patchDtoToBook(BookPatchDto patchDto);
    BookResponseDto bookToResponseDto(Book book);
}
