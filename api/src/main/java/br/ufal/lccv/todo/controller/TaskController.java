package br.ufal.lccv.todo.controller;

import br.ufal.lccv.todo.dto.TaskUpdateStatusRequest;
import br.ufal.lccv.todo.dto.TaskUpdateStatusResponse;
import br.ufal.lccv.todo.dto.TaskRequest;
import br.ufal.lccv.todo.dto.TaskResponse;
import br.ufal.lccv.todo.model.Task;
import br.ufal.lccv.todo.service.TaskService;
import jakarta.validation.Valid;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public ResponseEntity<Task> create(@Valid @RequestBody TaskRequest taskRequest) {
        Task task = taskService.create(taskRequest);
        return ResponseEntity.ok(task);
    }

    @GetMapping
    public ResponseEntity<List<TaskResponse>> all() {
        List<TaskResponse> tasks = taskService.findAll()
        .stream()
        .map(TaskResponse::new)
        .toList();

        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> show(@PathVariable Long id) {
        TaskResponse task = new TaskResponse(taskService.findById(id));
        return ResponseEntity.ok(task);
    }

    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> update(@PathVariable Long id, @Valid @RequestBody TaskRequest taskRequest) {
        Task task = taskService.findById(id);
        task.update(taskRequest);
        return ResponseEntity.ok(new TaskResponse(task));
    }

    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Transactional
    @PatchMapping("/{id}")
    public ResponseEntity<TaskUpdateStatusResponse> updateStatus(@Valid @RequestBody TaskUpdateStatusRequest taskUpdateStatusRequest, @PathVariable Long id) {
        Task task = taskService.findById(id);
        task.updateStatus(taskUpdateStatusRequest);
        return ResponseEntity.ok(new TaskUpdateStatusResponse(task));
    }


    @GetMapping("/filter/{period}")
    public ResponseEntity<List<TaskResponse>> filterByPeriod(@PathVariable String period) {
        List<TaskResponse> tasks = taskService.findByPeriod(period)
            .stream()
            .map(TaskResponse::new)
            .toList();

        return ResponseEntity.ok(tasks);
    }



}
