package izone.izoneProject.book.dto;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookPatchDto {
    private String description;
    private String condition;
    private String exchange;
}
