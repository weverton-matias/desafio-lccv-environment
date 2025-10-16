package br.ufal.lccv.todo.repository;

import br.ufal.lccv.todo.model.Task;

import java.time.OffsetDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByEventTimeBetween(OffsetDateTime start, OffsetDateTime end);
}
