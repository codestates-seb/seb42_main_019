package izone.izoneProject.book.dto;

import izone.izoneProject.book.entity.Book;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BookInfoResponseDto {
    private long bookId;
    private String url;
    private String thumbnail;
    private String isbn;
    private String title;
    private List<String> authors;
    private String publisher;
    private String content;


//    @QueryProjection
    public BookInfoResponseDto(Long bookId, String url, String thumbnail, String isbn, String title, List<String> authors,
                            String publisher, String content){
        this.bookId = bookId;
        this.url = url;
        this.thumbnail = thumbnail;
        this.isbn = isbn;
        this.title = title;
        this.authors = authors;
        this.publisher = publisher;
        this.content = content;
    }

    public static BookInfoResponseDto of (Book book) {
        return new BookInfoResponseDto(book.getBookId(), book.getUrl(), book.getThumbnail(), book.getIsbn(), book.getTitle(),
                book.getAuthors(), book.getPublisher(), book.getContents());
    }
}
