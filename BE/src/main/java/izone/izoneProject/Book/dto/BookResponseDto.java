package izone.izoneProject.Book.dto;

import izone.izoneProject.user.dto.UserDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookResponseDto {
    private Long bookId;

    private UserDto.Response user;

    private String bookUrl;

    private String thumbnail;

    private String title;

    private String author;

    private String publisher;

    private String content;

//    private String body;
}
