package br.ufal.lccv.todo.dto;

import br.ufal.lccv.todo.model.Task;

public record TaskUpdateStatusResponse(
    Boolean done){

    public TaskUpdateStatusResponse(Task task) {
        this(task.getDone());
    }
}
