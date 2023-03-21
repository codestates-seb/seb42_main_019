package izone.izoneProject.user.entity;

import izone.izoneProject.common.enums.LikeStatus;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userLikeId;
    @Enumerated(EnumType.STRING)
    private LikeStatus status;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "liker_id")
    private User liker;

    public void setLiker(User liker) {
        this.liker = liker;
    }
}
