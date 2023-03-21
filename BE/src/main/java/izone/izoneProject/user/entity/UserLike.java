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
    @JoinColumn(name = "like_user_id")
    private User likedUser;

    public void setLikedUser(User likedUser) {//User 양방향 매핑 메소드
        this.likedUser = likedUser;
        if (!likedUser.getLikeList().contains(this)) {
            likedUser.getLikeList().add(this);
        }
    }
}
