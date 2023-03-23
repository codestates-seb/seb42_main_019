package izone.izoneProject.book.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookDislikeResponseDto {
    private long bookId;
    private int dislikeCount;
}
