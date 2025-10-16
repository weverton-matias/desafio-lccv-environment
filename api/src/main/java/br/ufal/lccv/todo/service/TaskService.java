package br.ufal.lccv.todo.service;

import br.ufal.lccv.todo.dto.TaskRequest;
import br.ufal.lccv.todo.model.Task;
import br.ufal.lccv.todo.repository.TaskRepository;

import java.time.DayOfWeek;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repository;

    public Task create(TaskRequest taskRequest) {
        Task task = new Task();
        task.setType(taskRequest.type());
        task.setTitle(taskRequest.title());
        task.setDescription(taskRequest.description());
        task.setEventTime(taskRequest.event_time());
        task.setDone(taskRequest.done());
        return repository.save(task);
    }

    public Task findById (Long id) {
        return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Task not found"));
    }

    public void deleteById (Long id) {
        if(!repository.existsById(id)) throw new ResourceNotFoundException("Task not found");
        repository.deleteById(id);    
    }

    public List<Task> findAll() {
        return repository.findAll();
    }

    public List<Task> findByPeriod(String period) {
        OffsetDateTime now = OffsetDateTime.now(ZoneOffset.UTC);
        OffsetDateTime start;
        OffsetDateTime end;

        switch (period.toLowerCase()) {
            case "today":
                start = now.toLocalDate().atStartOfDay().atOffset(ZoneOffset.UTC);
                end = start.plusDays(1).minusNanos(1);
                break;
            case "week":
                start = now.with(DayOfWeek.MONDAY).toLocalDate().atStartOfDay().atOffset(ZoneOffset.UTC);
                end = start.plusDays(7).minusNanos(1);
                break;
            case "month":
                start = now.with(TemporalAdjusters.firstDayOfMonth()).toLocalDate().atStartOfDay().atOffset(ZoneOffset.UTC);
                end = now.with(TemporalAdjusters.lastDayOfMonth()).toLocalDate().atTime(23, 59, 59).atOffset(ZoneOffset.UTC);
                break;
            case "year":
                start = now.with(TemporalAdjusters.firstDayOfYear()).toLocalDate().atStartOfDay().atOffset(ZoneOffset.UTC);
                end = now.with(TemporalAdjusters.lastDayOfYear()).toLocalDate().atTime(23, 59, 59).atOffset(ZoneOffset.UTC);
                break;
            default: // all
                return repository.findAll();
        }

        return repository.findByEventTimeBetween(start, end);
    }
}
