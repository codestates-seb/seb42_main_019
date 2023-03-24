package izone.izoneProject.message.service;

import izone.izoneProject.message.entity.Message;
import izone.izoneProject.message.entity.ReadAt;
import izone.izoneProject.message.repository.MessageReadRepository;
import izone.izoneProject.message.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

@Service
@RequiredArgsConstructor
public class MessageCountService {
    private final MessageReadRepository messageReadRepository;
    private final MessageRepository     messageRepository;


    public ReadAt ReadReceived(long readId, long receiverId) {

//        int isReadCount = messageReadRepository.countByIsReadAt();
//        ReadAt readAt = messageRepository.findBy(receiverId);


    }
}


