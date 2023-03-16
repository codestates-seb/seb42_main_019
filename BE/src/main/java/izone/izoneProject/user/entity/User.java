package izone.izoneProject.user.entity;

import izone.izoneProject.book.entity.Book;
import izone.izoneProject.common.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class User extends Auditable {
    @ElementCollection(fetch = FetchType.EAGER)
    List<String> roles = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    List<Like> likeList = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    List<Dislike> dislikeList = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    List<UserComment> UserCommentList = new ArrayList<>();
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Book> bookList = new ArrayList<>();
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;
    @Column(nullable = false, updatable = false, unique = true)
    private String name;
    @Column(nullable = false, updatable = false, unique = true)
    private String email;
    @Column
    private String password;
    @Column
    private String region;
    @LastModifiedDate
    private LocalDateTime modifiedAt;


    public void setBook(Book book) {
        this.getBookList().add(book);
        if (book.getUser() != this) {
            book.setUser(this);
        }
    }

    public void setLike(Like like) {
        this.getLikeList().add(like);
        if (like.getUser() != this) {
            like.setUser(this);
        }
    }

    public void setDislike(Dislike dislike) {
        this.getDislikeList().add(dislike);
        if (dislike.getUser() != this) {
            dislike.setUser(this);
        }
    }

    public void setComment(UserComment userComment) {
        this.getUserCommentList().add(userComment);
        if (userComment.getUser() != this) {
            userComment.setUser(this);
        }
    }
}
