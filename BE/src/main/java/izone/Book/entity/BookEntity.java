package izone.Book.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class BookEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bookId;

    @Column(columnDefinition = "integer default 0")
    private int grade;

    @Column(nullable = false)
    private String body;



        private long user_id;

        public boolean exchange;

    }
