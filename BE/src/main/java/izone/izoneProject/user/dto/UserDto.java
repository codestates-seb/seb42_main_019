package izone.izoneProject.user.dto;

import lombok.*;

import javax.validation.constraints.*;
import java.time.LocalDateTime;

public class UserDto {
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class Post{
        @NotNull
        @Pattern(regexp = "[a-z|A-Z|가-힣]+", message = "영문 또는 한글 이름을 작성해주세요.")
        @Size(min = 2, max = 10, message = "닉네임은 2자 이상 10자 이하로 입력해주세요.")
        private String name;
        @NotNull
        @Email(message = "올바른 이메일 주소를 입력해주세요.")
        private String email;
        @NotBlank
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$", message = "비밀번호는 최소 8자리로, 숫자 1개와 문자 1개 이상을 포함해야 합니다.")
        private String password;
        @NotNull
        private String region;
    }
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class Patch{
        @NotBlank
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$", message = "비밀번호는 최소 8자리로, 숫자 1개와 문자 1개 이상을 포함해야 합니다.")
        private String password;
        @NotNull
        private String region;
    }
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    public static class Response{
        private String name;
        private String email;
        private String password;
        private String region;
        private int commentCount;
        private int likeCount;
        private int disLikeCount;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
    }
}
