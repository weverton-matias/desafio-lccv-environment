package br.ufal.lccv.todo.model;

import br.ufal.lccv.todo.dto.TaskRequest;
import br.ufal.lccv.todo.dto.TaskType;
import br.ufal.lccv.todo.dto.TaskUpdateStatusRequest;
import jakarta.persistence.*;
import lombok.Data;

import java.time.OffsetDateTime;

@Data
@Entity(name = "Task")
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TaskType type;
    private String description;
    private String title;

    @Column(name = "event_time")
    private OffsetDateTime eventTime;

    private Boolean done = false;
    private OffsetDateTime created = OffsetDateTime.now();


    public void update(TaskRequest taskRequest) {
        type = taskRequest.type();
        description = taskRequest.description();
        title = taskRequest.title();
        eventTime = taskRequest.event_time();
        done = taskRequest.done();
    }

    public void updateStatus(TaskUpdateStatusRequest taskUpdateStatusRequest) {
        done = taskUpdateStatusRequest.done();
    }
}
