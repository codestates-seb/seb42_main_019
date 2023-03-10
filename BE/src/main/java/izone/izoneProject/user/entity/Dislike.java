package izone.izoneProject.user.entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Dislike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long dislikeId;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public void setUser(User user) {
        this.user = user;
        if(!user.getDislikeList().contains(this)){
            user.getDislikeList().add(this);
        }
    }
}
