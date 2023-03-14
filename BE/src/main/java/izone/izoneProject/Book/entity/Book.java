package izone.izoneProject.Book.entity;

import izone.izoneProject.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "BOOK")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOOK_ID", updatable = false)
    private Long bookId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column(name = "TITLE", nullable = false)
    private String title;

    @Column(name = "BOOK_URL")
    private String bookUrl;

    @Column(name = "ISBN")
    private String isbn;

    @Column(name = "AUTHOR", nullable = false)
    private String author;

    @Column(name = "PUBLISHER", nullable = false)
    private String publisher;

    @Column(name = "THUMBNAIL")
    private String thumbnail;

    @Column(name = "CONTENT")
    private String content;

    @OneToMany(mappedBy = "book")
    private List<BookLike> bookLikeList = new ArrayList<>();

}
