package izone.izoneProject.Book.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
public class KaKaoBookInfoResponse {
    private String thumbnail;
    private List<String> authors;
    private String publisher;
    private String title;
    private String isbn;


    @Builder
    public KaKaoBookInfoResponse(String thumbnail, List<String> authors, String url, String publisher, String title, String isbn) {
        this.thumbnail = thumbnail;
        this.authors = authors;
        this.publisher = publisher;
        this.title = title;
        this.isbn = isbn;
    }
}
