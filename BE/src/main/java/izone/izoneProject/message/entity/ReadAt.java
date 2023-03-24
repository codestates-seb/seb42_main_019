package izone.izoneProject.message.entity;

import izone.izoneProject.user.entity.User;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReadAt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long readId;

    @Column(name = "read_count", nullable = false)
    @ColumnDefault("0") //default : 0
    private int count;
    //private Long count; -> 값을 0이 아닌 null값으로 둬야할지?

    @ManyToOne
    @JoinColumn(name = "message_Id")
    private Message message;

}