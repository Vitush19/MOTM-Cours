package io.takima.demo.mail;

import io.takima.demo.template.Template;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 */
@Repository
public interface MailDAO extends CrudRepository<Mail, Long> {

}
