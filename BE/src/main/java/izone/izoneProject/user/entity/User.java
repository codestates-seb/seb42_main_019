package izone.izoneProject.user.entity;

import izone.izoneProject.book.entity.Book;
import izone.izoneProject.common.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class User extends Auditable {
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
//    @ElementCollection(fetch = FetchType.EAGER)
//    List<String> roles = new ArrayList<>();
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<UserLike> likeList = new ArrayList<>();
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<UserDislike> dislikeList = new ArrayList<>();
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<UserComment> UserCommentList = new ArrayList<>();
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Book> bookList = new ArrayList<>();


    public void setBook(Book book) {
        this.getBookList().add(book);
        if (book.getUser() != this) {
            book.setUser(this);
        }
    }


    public void setComment(UserComment userComment) {
        this.getUserCommentList().add(userComment);
        if (userComment.getUser() != this) {
            userComment.setUser(this);
        }
    }
    public void setUserDislike(UserDislike userDislike) {
        this.getDislikeList().add(userDislike);
        if (userDislike.getUser() != this) {
            userDislike.setUser(this);
        }
    }
    public void setUserLike(UserLike userLike) {
        this.getLikeList().add(userLike);
        if (userLike.getUser() != this) {
            userLike.setUser(this);
        }
    }

}
