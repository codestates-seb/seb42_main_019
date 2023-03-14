package izone.izoneProject.Book.dto;

import izone.izoneProject.Book.entity.Book;
import izone.izoneProject.user.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookInfoResponseDto {
    private Long bookId;

    private String bookUrl;

    private String thumbnail;

    private String title;

    private String author;

    private String publisher;

    private String content;


//    @QueryProjection
    public BookInfoResponseDto(Long bookId, String bookUrl, String thumbnail, String title, String author,
                            String publisher, String content){
        this.bookId = bookId;
        this.bookUrl = bookUrl;
        this.thumbnail = thumbnail;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.content = content;
    }

    public static BookInfoResponseDto of (Book book) {
        return new BookInfoResponseDto(book.getBookId(), book.getBookUrl(), book.getThumbnail(), book.getTitle(),
                book.getAuthor(), book.getPublisher(), book.getContent());
    }
}
