package izone.izoneProject.message.entity;


import com.fasterxml.jackson.annotation.JsonProperty;
import izone.izoneProject.audit.Auditable;
import izone.izoneProject.user.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;



@Entity
@Getter
@Setter
@NoArgsConstructor
public class Message /*extends Auditable*/ {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long messageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.NO_ACTION) // 발신자 계정 삭제시 쪽지도 함께 삭제
    private User user;

    //TODO: response상 출력될 sender
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SENDER_ID")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private User sender;

    //TODO:
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "RECEIVER_ID")
    @OnDelete(action = OnDeleteAction.NO_ACTION)
    private User receiver;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "RECEIVER_ID")
//    @OnDelete(action = OnDeleteAction.NO_ACTION) // 수신자 계정 삭제시 쪽지도 함께 삭제
//    private User receiver;

    @Column(columnDefinition = "TEXT", nullable = false)
    private  String title;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(nullable = false)
    private boolean deleteBySender;

    @Column(nullable = false)
    private boolean deleteByReceiver;

    //TODO: 보낸이가 쪽지 삭제시 해당 필드값을 true로 바꿔준다.
    public void deleteBySender() {
        this.deleteByReceiver = true;
    }

    //TODO: 받는이가 쪽지 삭제시 해당 필드값을 true로 바꿔준다.
    public void deleteByReceiver() {
        this.deleteByReceiver = true;
    }

    //TODO: 보낸이와 받는이의 값 둘다 true일 경우 true를 반환한다.
    //      해당 메서드 호출시 결과값 true => DB에서 쪽지 삭제
    public boolean isDeleted() {
        return isDeleteBySender() && isDeleteByReceiver();
    }

    //@Builder
    //public Message(User sender, User receiver, String title, String content) {
    //    this.sender   = sender;
    //    this.receiver = receiver;
    //    this.title = title;
    //    this.content  = content;
    //}
    public void setReceiver(User user) {
        this.user = user;
        if (!user.getReceivedList().contains(this)) {
            user.getReceivedList().add(this);
        }
    }
    public void setSender(User user) {
        this.user = user;
        if (!user.getSentList().contains(this)) {
            user.getSentList().add(this);
        }
    }
}

