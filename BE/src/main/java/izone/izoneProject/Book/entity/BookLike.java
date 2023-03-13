package izone.izoneProject.Book.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BookLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookLikeId;

    @ManyToOne
    @JoinColumn(name = "BOOK_ID")
    private Book book;

//    @ManyToOne
//    @JoinColumn(name = "USER_ID")
//    private User user;

//    public void setBook(Book book) {
//        this.book = book;
//        if (!book.getBookLikeList().contains(this)) {
//            book.getBookLikeList().add(this);
//        }
//    }

//    public void setUser(User user) {
//        this.user = user;
//        if (!book.getUserLikeList().contains(this)) {
//            book.getUserLikeList().add(this);
//        }
//    }
}







