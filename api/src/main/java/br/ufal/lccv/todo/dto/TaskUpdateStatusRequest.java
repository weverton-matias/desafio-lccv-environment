package br.ufal.lccv.todo.dto;

import jakarta.validation.constraints.NotNull;

public record TaskUpdateStatusRequest(@NotNull Boolean done){}
