package izone.izoneProject.book.dto;

import izone.izoneProject.book.entity.BookLike;
import lombok.*;

@Data
@Builder
public class BookLikeResponseDto {
    private long bookId;
    private int likeCount;
}
