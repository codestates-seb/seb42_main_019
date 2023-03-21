package izone.izoneProject.book.entity;

import izone.izoneProject.common.enums.LikeStatus;
import izone.izoneProject.user.entity.User;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bookLikeId;

    @Enumerated(EnumType.STRING)
    private LikeStatus status;

    @ManyToOne
    @JoinColumn(name = "BOOK_ID")
    private Book book;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;
}







