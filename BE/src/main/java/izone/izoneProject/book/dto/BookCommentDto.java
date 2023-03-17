package izone.izoneProject.Book.dto;


import izone.izoneProject.user.entity.User;
import lombok.*;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class BookCommentDto {
    @Getter
    @Setter
    public static class Post {
        @NotBlank
        private String content;
    }

    @Getter
    @Setter
    public static class Patch{
        @NotBlank
        private String content;
    }

    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response {
        private Long bookId;
        private String content;
        private Long userId;
        private Long commentId;
        private LocalDateTime createdAt;//Auditable 불러오는 것
    }
}
