package com.chibbol.wtz.domain.job.repository;

import com.chibbol.wtz.domain.job.entity.UserAbilityTurnRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAbilityTurnRecordRepository extends JpaRepository<UserAbilityTurnRecord, Long> {
}
