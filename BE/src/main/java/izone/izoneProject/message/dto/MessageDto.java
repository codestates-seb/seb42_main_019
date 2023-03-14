package izone.izoneProject.message.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@NoArgsConstructor
public class MessageDto {

    @NotNull
    private long senderId;

    @NotNull
    private long receiverId;

    @NotNull
    @Pattern(regexp = "^(?!\\s+$).+", message = "Fill in the blank.")
    private String content;

    public MessageDto(long senderId, long receiverId, String content) {
        this.senderId   = senderId;
        this.receiverId = receiverId;
        this.content    = content;
    }

    private void setContent(String content) {
        this.content = content;
    }


    //public static MessageDto toDto(Message message) {
    // return new MessageDto(
    // message.getSender().getName(),
    // message.getReceiver().getName(),
    // message.getContent()
    // );
    //}

}
