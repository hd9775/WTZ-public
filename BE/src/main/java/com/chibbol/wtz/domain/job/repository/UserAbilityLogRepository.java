package com.chibbol.wtz.domain.job.repository;

import com.chibbol.wtz.domain.job.entity.Job;
import com.chibbol.wtz.domain.job.entity.UserAbilityLog;
import com.chibbol.wtz.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserAbilityLogRepository extends JpaRepository<UserAbilityLog, Long> {
    List<UserAbilityLog> findTop10ByUserOrderByStartAtDesc(User user);

    int countByUser(User user);

    int countByUserAndResult(User user, boolean b);

    int countByUserAndJob(User user, Job job);

    int countByUserAndJobAndResult(User user, Job job, boolean b);

    List<UserAbilityLog> findAllByGameCode(String gameCode);
}
