package com.chibbol.wtz.domain.job.repository;

import com.chibbol.wtz.domain.job.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    Job findByName(String name);
}
