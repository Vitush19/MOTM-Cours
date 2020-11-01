package io.takima.demo.template;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 */
@Repository
public interface TemplateDAO extends CrudRepository<Template, Long> {

}
