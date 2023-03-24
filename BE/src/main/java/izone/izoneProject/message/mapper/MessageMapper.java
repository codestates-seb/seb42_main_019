package izone.izoneProject.message.mapper;

import izone.izoneProject.message.dto.MessagePostDto;
import izone.izoneProject.message.dto.MessageResponseDto;
import izone.izoneProject.message.entity.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MessageMapper {

    @Mapping(source = "receiverName", target = "user.name")
    Message postDtoToMessage(MessagePostDto messagePostDto);

    @Mapping(source = "sender.name", target = "senderName") //TODO: mapping 추가
    @Mapping(source = "user.name", target = "receiverName") //TODO: receiver.name -> user.name으로 변경
    MessageResponseDto messageToResponseDto(Message message);

    List<MessageResponseDto> messageToResponseDto(List<Message> messages);
}
