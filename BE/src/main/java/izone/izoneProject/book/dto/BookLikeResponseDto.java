package izone.izoneProject.book.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookLikeResponseDto {
    private long bookId;
    private int likeCount;
}
