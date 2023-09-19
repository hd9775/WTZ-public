package com.chibbol.wtz.domain.vote.repository;

import com.chibbol.wtz.domain.vote.entity.VoteTurnRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteTurnRecordRepository extends JpaRepository<VoteTurnRecord, Long> {
}
