package com.chibbol.wtz.domain.level.repository;

import com.chibbol.wtz.domain.level.entity.UserLevel;
import com.chibbol.wtz.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserLevelRepository extends JpaRepository<UserLevel, Long> {
    Optional<UserLevel> findByUserUserSeq(Long user_seq);

    Optional<UserLevel> findByUser(User user);
}
