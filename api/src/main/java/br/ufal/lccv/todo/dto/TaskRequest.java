package br.ufal.lccv.todo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


import java.time.OffsetDateTime;

public record TaskRequest (
    @NotNull(message = "Tipo obrigatório")
    TaskType type,

    @NotBlank(message = "Título da atividade obrigatório")
    String title,

    @NotBlank(message = "Descrição da atividade obrigatório")
    String description,

    @NotNull(message = "Data da atividade obrigatório")
    OffsetDateTime event_time,

    @NotNull(message = "Status da atividade obrigatório")
    Boolean done
){
}