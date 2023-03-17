package izone.izoneProject.book.entity;

import izone.izoneProject.book.dto.BookPostDto;
import izone.izoneProject.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;
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
    private long bookId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column(name = "TITLE", nullable = false)
    private String title;

    @Column(name = "URL")
    @Size(max = 1000000)
    private String url;

    @Column(name = "ISBN")
    private String isbn;

    @ElementCollection
    @Column(name = "AUTHORS", nullable = false)
    private List<String> authors = new ArrayList<>();

    @Column(name = "PUBLISHER", nullable = false)
    private String publisher;

    @Column(name = "THUMBNAIL")
    private String thumbnail;

    @Column(name = "CONTENTS")
    private String contents;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "CONDITION")
    private String condition;

    @Column(name = "EXCHANGE")
    private String exchange;

    @OneToMany(mappedBy = "book")
    private List<BookLike> bookLikeList = new ArrayList<>();
}

//isbn 책을 누를 때?