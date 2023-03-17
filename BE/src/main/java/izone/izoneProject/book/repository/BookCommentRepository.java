package izone.izoneProject.book.repository;

import izone.izoneProject.book.entity.BookComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookCommentRepository extends JpaRepository<BookComment, Long> {

}
//저장하고 싶으면 save 지우고싶으면 delete 값을 가져오고 싶으면 find 어떤 값을..? by 뒤에는 column의 이름이 들어감 자주 find by id가 있음 메세드?
//어떻게 보면 메서드가 맞습니다. 그래서 어.. 서비스에서는 레포지토리를 지원하는 메서드를 사용해 요청들을 수행하는 클래스로 보면 됨 이제 근데
//로직이 두 개가 있어요.. 저희가 직접적으로 사용하는 로직이 있음 머리르써야해!!!!! 그것도 결국 레포지토리 살려줘!