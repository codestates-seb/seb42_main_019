package izone.izoneProject.user.dto;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;

public class UserCommentDto {
    public static class Post{
        @NotEmpty(message = "질문 내용을 작성해야 합니다.")
        private String content;
    }

    public static class Patch{
        @NotEmpty(message = "질문 내용을 작성해야 합니다.")
        private String  content;
    }
    public static class Response{
        private String content;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;

    }
}
