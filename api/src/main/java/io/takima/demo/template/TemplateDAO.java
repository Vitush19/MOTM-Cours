package io.takima.demo.template;

import io.takima.demo.template.Template;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 *
 */
@Repository
public interface TemplateDAO extends CrudRepository<Template, Long> {

}
