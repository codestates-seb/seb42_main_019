package izone.izoneProject.message.mapper;

import izone.izoneProject.message.dto.MessagePostDto;
import izone.izoneProject.message.dto.MessageResponseDto;
import izone.izoneProject.message.entity.Message;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MessageMapper {

    Message postDtoToMessage(MessagePostDto messagePostDto);

    //TODO: ResponseDto에서 senderName/receiverName 빠짐 -> Dto sender/receiver 변경
    @Mapping(source = "sender", target = "sender")
    @Mapping(source = "user", target = "receiver")
    MessageResponseDto messageToResponseDto(Message message);


    @Mapping(source = "sender", target = "sender")
    @Mapping(source = "user", target = "receiver")
    List<MessageResponseDto> messageToResponseDto(List<Message> messages);
}
