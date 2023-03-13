package izone.izoneProject.Book.dto;

import izone.izoneProject.Book.entiry.Book;
import lombok.Getter;

@Getter

public class BookInfoResponseDto {
    private Long bookId;

    private String bookUrl;

    private String title;

    private String author;

    private String publisher;

    private String content;


//    @QueryProjection
    public BookInfoResponseDto(Long bookId, String bookUrl, String title, String author,
                            String publisher, String content){
        this.bookId = bookId;
        this.bookUrl = bookUrl;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.content = content;
    }

    public static BookInfoResponseDto of (Book book) {
        return new BookInfoResponseDto(book.getBookId(), book.getImgUrl(), book.getTitle(),
                book.getAuthor(), book.getPublisher(), book.getBody());
    }
}
