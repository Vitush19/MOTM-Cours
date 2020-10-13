package io.takima.demo.template;

import io.takima.demo.template.Template;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/templates")
@CrossOrigin
public class TemplateController {

    private final TemplateDAO templateDAO;

    public TemplateController(TemplateDAO templateDAO) {
        this.templateDAO = templateDAO;
    }

    @GetMapping()
    public List<Template> getTemplate() {
        Iterable<Template> it = this.templateDAO.findAll();
        List<Template> templates = new ArrayList<>();
        it.forEach(e -> templates.add(e));

        return templates;
    }

    @PostMapping()
    public Template addTemplate(@RequestBody Template template) {
        return this.templateDAO.save(template);
    }

    @DeleteMapping("/{id}")
    public void deleteTemplate(@PathVariable Long id) {
        this.templateDAO.deleteById(id);
    }

}
