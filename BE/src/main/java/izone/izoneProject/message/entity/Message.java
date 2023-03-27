package izone.izoneProject.message.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import izone.izoneProject.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class Message { //extends Auditable

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long messageId;

    //TODO: response -> 출력될 receiver
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_id")
    @JsonIgnore
    @OnDelete(action = OnDeleteAction.NO_ACTION) // 발신자 계정 삭제시 쪽지도 함께 삭제
    private User user;

    //TODO: response -> 출력될 sender
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id")
    @JsonIgnore
    @OnDelete(action = OnDeleteAction.NO_ACTION) // 수신자 계정 삭제시 쪽지도 함께 삭제
    private User sender;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    //TODO: localdatetime 생성
    @CreatedDate
    @Column(name = "create_date_time", nullable = false)
    private LocalDateTime date;

    @Column(name = "read_date_time")
    @LastModifiedDate
    private LocalDateTime readAt;

    @PrePersist
    public void createdAt() {
        this.date = LocalDateTime.now();
    }

    //TODO: User user -> User receiver 변경
    public void setUser(User receiver) {
        this.user = receiver;   //TODO: 메세지 전달시 받을 User 정보를 첨부하기 위해 this.receiver = receiver 정보를 끌어온다.
        if (!user.getReceivedList().contains(this)) {
            user.getReceivedList().add(this);
        }
    }

    //TODO: User user -> User sender 변경
    public void setSender(User sender) {
        this.sender = sender;   //TODO:
        if (!sender.getSentList().contains(this)) {
            sender.getSentList().add(this);
        }
    }
}
