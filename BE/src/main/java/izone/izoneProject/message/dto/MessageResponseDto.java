package izone.izoneProject.message.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import izone.izoneProject.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponseDto {
     private long messageId;
     private UserDto.Response sender;        //TODO:
     private UserDto.Response receiver;      //TODO:
     private String content;
     @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
     private LocalDateTime date;
     private LocalDateTime readAt;
}
