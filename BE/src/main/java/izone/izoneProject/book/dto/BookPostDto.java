package izone.izoneProject.book.dto;

import lombok.Getter;

import javax.validation.constraints.NotEmpty;
import java.util.List;

@Getter
public class BookPostDto {
    @NotEmpty
    private String thumbnail;
    @NotEmpty
    private String title;
    @NotEmpty
    private List<String> authors;
    @NotEmpty
    private String publisher;
    @NotEmpty
    private String isbn;
    @NotEmpty
    private String url;
    private String contents;
    @NotEmpty
    private String description;
    @NotEmpty
    private String conditions;

    private String exchange;

}
