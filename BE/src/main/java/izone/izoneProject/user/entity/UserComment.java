package izone.izoneProject.user.entity;

import izone.izoneProject.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class UserComment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @OnDelete(action= OnDeleteAction.CASCADE)
    private User user;
    @Column(nullable = false, columnDefinition="TEXT")
    private String content;

    public void setUser(User user) {//User 양방향 매핑 메소드
        this.user = user;
        if (!user.getUserCommentList().contains(this)) {
            user.getUserCommentList().add(this);
        }
    }
}
