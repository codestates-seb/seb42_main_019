package izone.izoneProject.user.entity;

import izone.izoneProject.common.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

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
    @ManyToOne
    @JoinColumn(name = "recipient_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User recipient;
    @Column(nullable = false, columnDefinition="TEXT")
    private String content;

    public void setRecipient(User recipient) {
        this.recipient = recipient;
        if (!recipient.getUserCommentList().contains(this)) {
            recipient.getUserCommentList().add(this);
        }
    }
}
