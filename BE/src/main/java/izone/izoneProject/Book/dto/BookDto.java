package izone.izoneProject.Book.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class BookDto {
    @Getter
    @AllArgsConstructor
    public static class Post {
        @NotBlank
        private String body;

    }

}
