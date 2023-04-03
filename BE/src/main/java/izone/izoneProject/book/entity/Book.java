package izone.izoneProject.book.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import izone.izoneProject.common.audit.Auditable;
import izone.izoneProject.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "BOOKS")
public class Book extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOOK_ID", updatable = false)
    private long bookId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "USER_ID")
    private User user;

    @Column(name = "TITLE", nullable = false)
    private String title;

    @Column(name = "URL")
    @Size(max = 1000000)
    private String url;

    @Column(name = "ISBN")
    private String isbn;

    @ElementCollection
    @Column(name = "AUTHORS", nullable = false)
    private List<String> authors = new ArrayList<>();

    @Column(name = "PUBLISHER", nullable = false)
    private String publisher;

    @Column(name = "THUMBNAIL")
    private String thumbnail;

    @Column(name = "CONTENTS")
    @Size(max = 1000000)
    private String contents;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "CONDITIONS")
    private String conditions;

    @Column(name = "EXCHANGE", columnDefinition = "integer default 0")
    private String exchange;

    @Column(columnDefinition = "integer default 0")
    private int totalLikeCount;

    @Column(columnDefinition = "integer default 0")
    private int totalDislikeCount;

    @Column(columnDefinition = "integer default 0")
    private int likeCount;

    @Column(columnDefinition = "integer default 0")
    private int dislikeCount;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<BookComment> bookCommentList = new ArrayList<>();

    public void setLikeCount(int likeCount) {
        this.likeCount = likeCount;
    }

    public void setDislikeCount(int dislikeCount) {
        this.dislikeCount = dislikeCount;
    }

    public void setTotalLikeCount(int totalLikeCount) {
        this.totalLikeCount = totalLikeCount;
    }

    public void setTotalDislikeCount(int totalDislikeCount) {
        this.totalDislikeCount = totalDislikeCount;

    }
}