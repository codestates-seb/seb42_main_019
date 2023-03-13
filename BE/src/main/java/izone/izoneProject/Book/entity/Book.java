package izone.izoneProject.Book.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id", updatable = false)
    private Long bookId;


    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "author", nullable = false)
    private String author;

    @Column(name = "publisher", nullable = false)
    private String publisher;

    @Column(name = "img_url")
    private String imgUrl;

    @Column(name = "body")
    private String body;
//
//    @OnetoMany(mappedBy = "book")
//    private List<BookLike> bookLikeList = new ArrList<>();

}
