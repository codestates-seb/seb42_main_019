package izone.izoneProject.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;

public class UserCommentDto {
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post{
        @NotEmpty(message = "질문 내용을 작성해야 합니다.")
        private String content;
    }
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Patch{
        @NotEmpty(message = "질문 내용을 작성해야 합니다.")
        private String content;
    }
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Response{
        private long commentId;
        private String senderName;
        private String recipientName;
        private String content;
        private LocalDateTime createdAt;

    }
}
