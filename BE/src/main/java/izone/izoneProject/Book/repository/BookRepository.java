package izone.izoneProject.Book.repository;


import izone.izoneProject.Book.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository <Book,Long>
{

}
