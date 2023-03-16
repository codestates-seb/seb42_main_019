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
public class UserDislike {
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
        if (!user.getDislikeList().contains(this)) {
            user.getDislikeList().add(this);
        }
    }
    public void setDisLikedUser(User dislikedUser) {//User 양방향 매핑 메소드
        this.dislikedUser = dislikedUser;
        if (!user.getDislikeList().contains(this)) {
            user.getDislikeList().add(this);
        }
    }

}
