package br.ufal.lccv.todo.dto;

import br.ufal.lccv.todo.model.Task;
import java.time.OffsetDateTime;

public record TaskResponse (
    Long id,
    TaskType type,
    String title,
    String description,
    OffsetDateTime event_time,
    Boolean done){
    
    public TaskResponse (Task task) {
        this(task.getId(), task.getType(), task.getTitle(), task.getDescription(), task.getEventTime(),  task.getDone());
    }
}
