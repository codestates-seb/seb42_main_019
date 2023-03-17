package izone.izoneProject.book.entity;

import izone.izoneProject.common.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity //기본데이터,테이블 명
public class BookComment extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bookCommentId;
    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;
    @Column(nullable = false)
    private String content;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id")








}
