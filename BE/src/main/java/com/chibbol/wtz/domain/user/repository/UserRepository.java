package com.chibbol.wtz.domain.user.repository;

import com.chibbol.wtz.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByEmail(String email);

    User findByUserSeq(Long userSeq);

    @Query("SELECT u.nickname FROM User u WHERE u.userSeq = :userSeq")
    String findNicknameByUserSeq(@Param("userSeq") Long userSeq);
}
