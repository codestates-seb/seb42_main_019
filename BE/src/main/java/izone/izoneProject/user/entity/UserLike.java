package izone.izoneProject.user.entity;

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
public class UserLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userDislikeId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "disliked_user")
    private User dislikedUser;

    public void setUser(User user) {//User 양방향 매핑 메소드
        this.user = user;
        if (!user.getLikeList().contains(this)) {
            user.getLikeList().add(this);
        }
    }
    public void setLikedUser(User user) {//User 양방향 매핑 메소드
        this.user = user;
        if (!user.getLikeList().contains(this)) {
            user.getLikeList().add(this);
        }
    }

}
