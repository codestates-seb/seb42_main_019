package izone.izoneProject.message.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessagePostDto {
    @NotNull
    @Pattern(regexp = "^(?!\\s+$).+", message = "Fill in the blank.")
    private String content;
}