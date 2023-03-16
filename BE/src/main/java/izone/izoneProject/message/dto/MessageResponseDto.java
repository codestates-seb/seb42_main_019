package izone.izoneProject.message.dto;

import izone.izoneProject.message.entity.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponseDto {
     private String senderName;
     private String receiverName;
     private String title;
     private String content;

     public static MessageResponseDto toDto(Message message) {
         return new MessageResponseDto(
                 message.getTitle(),
                 message.getContent(),
                 message.getSender().getName(),
                 message.getReceiver().getName()
         );
     }
}
