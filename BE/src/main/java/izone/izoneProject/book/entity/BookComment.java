package izone.izoneProject.book.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import izone.izoneProject.common.audit.Auditable;
import izone.izoneProject.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity //기본데이터,테이블 명
public class BookComment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bookCommentId;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "book_id")
    private Book book;
    @Column
    private String isbn;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "user_id")
    private User user;
    @Column(nullable = false)
    private String content;

    public void setBook(Book book) {
        this.book = book;
        if (!book.getBookCommentList().contains(this)) {
            book.getBookCommentList().add(this);
        }
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }
}
