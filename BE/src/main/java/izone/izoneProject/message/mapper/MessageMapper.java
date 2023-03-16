package izone.izoneProject.message.mapper;

import izone.izoneProject.message.dto.MessageDto;
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

    @Mapping(source = "user.name", target = "senderName")
    MessageResponseDto messageToResponseDto(Message message);

    List<MessageResponseDto> messageToResponseDto(List<Message> messages);
}
