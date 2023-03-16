package izone.izoneProject.message.dto;

import izone.izoneProject.message.entity.Message;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;


public class MessageDto {

//    @NotNull
//    private long senderId;
//    @NotNull
//    private long receiverId;
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Post {
        @NotNull
        @Pattern(regexp = "^(?!\\s+$).+", message = "Fill in the blank.")
        private String title;
        @NotNull
        @Pattern(regexp = "^(?!\\s+$).+", message = "Fill in the blank.")
        private String content;
        private String receiverName;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {
        private String senderName;
        private String receiverName;
        private String title;
        private String content;


    }


//    private void setContent(String content) {
//        this.content = content;
//    }


    //public static MessageDto toDto(Message message) {
    // return new MessageDto(
    // message.getSender().getName(),
    // message.getReceiver().getName(),
    // message.getContent()
    // );
    //}

}
