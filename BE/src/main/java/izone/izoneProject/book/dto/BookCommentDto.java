package izone.izoneProject.book.dto;


import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class BookCommentDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        @NotBlank
        private String content;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Patch{
        @NotBlank
        private String content;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private long bookCommentId;
        private long bookId;
        private long userId;
        private String userName;
        private String bookName;
        private String content;
        private LocalDateTime createdAt;//Auditable 불러오는 것
    }
}
