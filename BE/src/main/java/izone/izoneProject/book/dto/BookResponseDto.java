package izone.izoneProject.book.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class BookResponseDto {
    private long bookId;
//    private UserDto.Response user;
    private String url;
    private String thumbnail;
    private String title;
    private String isbn;
    private List<String> authors;
    private String publisher;
    private String contents;
    private String description;
    private String condition;
    private String exchange;
    private LocalDateTime createdAt;
}
