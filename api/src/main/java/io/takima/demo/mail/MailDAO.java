package io.takima.demo.mail;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 */
@Repository
public interface MailDAO extends CrudRepository<Mail, Long> {

}
