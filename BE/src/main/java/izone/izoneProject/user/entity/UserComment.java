package izone.izoneProject.user.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.bytebuddy.asm.Advice;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class UserComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column
    private String content;
    @Column
    @LastModifiedDate
    private LocalDateTime modifiedAt;

    public void setUser(User user) {//User 양방향 매핑 메소드
        this.user = user;
        if (!user.getUserCommentList().contains(this)) {
            user.getUserCommentList().add(this);
        }
    }
}
