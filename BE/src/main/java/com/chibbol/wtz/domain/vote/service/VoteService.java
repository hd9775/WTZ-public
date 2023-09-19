package com.chibbol.wtz.domain.vote.service;

import com.chibbol.wtz.domain.job.entity.RoomUserJob;
import com.chibbol.wtz.domain.job.repository.JobRepository;
import com.chibbol.wtz.domain.job.repository.RoomUserJobRedisRepository;
import com.chibbol.wtz.domain.vote.dto.VoteDTO;
import com.chibbol.wtz.domain.vote.dto.VoteResultDTO;
import com.chibbol.wtz.domain.vote.entity.Vote;
import com.chibbol.wtz.domain.vote.repository.VoteRedisRepository;
import com.chibbol.wtz.global.timer.dto.VoteResultDataDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class VoteService {
    private final VoteRedisRepository voteRedisRepository;
    private final RoomUserJobRedisRepository roomUserJobRedisRepository;
    private final JobRepository jobRepository;

    public void vote(VoteDTO voteDTO) {
        if (!canVote(voteDTO)) {
            logVoteFail(voteDTO);
            return;
        }

        saveVote(voteDTO);
        logVoteSuccess(voteDTO);
    }

    private boolean canVote(VoteDTO voteDTO) {
        return roomUserJobRedisRepository.canVote(voteDTO.getGameCode(), voteDTO.getUserSeq());
    }

    private void saveVote(VoteDTO voteDTO) {
        Vote vote = Vote.builder()
                .gameCode(voteDTO.getGameCode())
                .turn(voteDTO.getTurn())
                .userSeq(voteDTO.getUserSeq())
                .targetUserSeq(voteDTO.getTargetUserSeq())
                .build();
        voteRedisRepository.save(vote);
    }

    public VoteResultDataDTO voteResult(String gameCode, int turn) {
        List<Vote> votes = voteRedisRepository.findAllByGameCodeAndTurn(gameCode, turn);
        List<RoomUserJob> roomUser = roomUserJobRedisRepository.findAllByGameCode(gameCode);

        Map<Long, Boolean> canVoteMap = getCanVoteMap(gameCode);
        Long politicianSeq = jobRepository.findByName("Politician").getJobSeq();
        Long politician = null;
        for(RoomUserJob roomUserJob : roomUser) {
            if(roomUserJob.getJobSeq().equals(politicianSeq)) {
                politician = roomUserJob.getUserSeq();
                break;
            }
        }

        Map<Long, Integer> voteCountMap = calculateVoteCounts(roomUser, votes, canVoteMap, politician);

        Long mostVotedTargetUserSeq = findMostVotedTargetUserSeq(voteCountMap);
        roomUserJobRedisRepository.updateCanVoteByRoomSeq(gameCode, true);

        return createVoteResultData(gameCode, mostVotedTargetUserSeq, politician, turn);
    }

    public List<VoteResultDTO> getRealTimeVoteResultWithJob(String gameCode, int turn) {
        List<Vote> votes = voteRedisRepository.findAllByGameCodeAndTurn(gameCode, turn);
        List<RoomUserJob> roomUser = roomUserJobRedisRepository.findAllByGameCode(gameCode);

        Map<Long, Boolean> canVoteMap = getCanVoteMap(gameCode);
        Long politicianSeq = jobRepository.findByName("Politician").getJobSeq();
        Long politician = null;
        for(RoomUserJob roomUserJob : roomUser) {
            if(roomUserJob.getJobSeq().equals(politicianSeq)) {
                politician = roomUserJob.getUserSeq();
                break;
            }
        }

        Map<Long, Integer> voteCountMap = calculateVoteCounts(roomUser, votes, canVoteMap, politician);

        return createVoteResultDTOList(voteCountMap);
    }

    private Map<Long, Boolean> getCanVoteMap(String gameCode) {
        List<RoomUserJob> roomUserJobs = roomUserJobRedisRepository.findAllByGameCode(gameCode);
        Map<Long, Boolean> canVoteMap = new HashMap<>();

        for (RoomUserJob roomUserJob : roomUserJobs) {
            canVoteMap.put(roomUserJob.getUserSeq(), roomUserJob.isAlive() && roomUserJob.isCanVote());
        }

        return canVoteMap;
    }

    private Map<Long, Integer> calculateVoteCounts(List<RoomUserJob> roomUser, List<Vote> votes, Map<Long, Boolean> canVoteMap, Long politician) {
        Map<Long, Integer> voteCountMap = new HashMap<>();
        for(RoomUserJob roomUserJob : roomUser) {
            voteCountMap.put(roomUserJob.getUserSeq(), 0);
        }
        voteCountMap.put(0L, 0);


        for(Vote vote : votes) {
            if(!canVoteMap.get(vote.getUserSeq())) {
                continue;
            }

            Long targetUserSeq = vote.getTargetUserSeq();
            // 무투표(0) 선택하였을 경우
//            if(targetUserSeq.equals(0L)) {
//                continue;
//            }

            // 정치인은 2표 나머지는 1표씩 적용
            if(vote.getUserSeq().equals(politician)) {
                voteCountMap.put(targetUserSeq, voteCountMap.getOrDefault(targetUserSeq, 0) + 2);
            } else {
                voteCountMap.put(targetUserSeq, voteCountMap.getOrDefault(targetUserSeq, 0) + 1);
            }
        }

        return voteCountMap;
    }

    private Long findMostVotedTargetUserSeq(Map<Long, Integer> voteCountMap) {
        Long mostVotedTargetUserSeq = null;
        int maxVotes = 0;

        for (Map.Entry<Long, Integer> entry : voteCountMap.entrySet()) {
            Long targetUserSeq = entry.getKey();
            int voteCount = entry.getValue();

            if (voteCount > maxVotes) {
                maxVotes = voteCount;
                mostVotedTargetUserSeq = targetUserSeq;
            } else if (voteCount == maxVotes) {
                mostVotedTargetUserSeq = null;
            }
        }

        return mostVotedTargetUserSeq;
    }

    private VoteResultDataDTO createVoteResultData(String gameCode, Long mostVotedTargetUserSeq, Long politician, int turn) {
        if (mostVotedTargetUserSeq == null) {
            return VoteResultDataDTO.builder().userSeq(null).politicianSeq(null).build();
        }

        if (mostVotedTargetUserSeq.equals(0L)) {
            logVoteInfo("SKIP VOTE", gameCode, turn);
            return VoteResultDataDTO.builder().userSeq(null).politicianSeq(null).build();
        }

        if (mostVotedTargetUserSeq.equals(politician)) {
            logVoteInfo("MOST VOTED USER IS POLITICIAN", gameCode, turn);
            return VoteResultDataDTO.builder().userSeq(null).politicianSeq(politician).build();
        }

        RoomUserJob mostVotedTargetUser = roomUserJobRedisRepository.findByGameCodeAndUserSeq(gameCode, mostVotedTargetUserSeq);
        mostVotedTargetUser.setAlive(false);
        mostVotedTargetUser.setCanVote(false);
        roomUserJobRedisRepository.save(mostVotedTargetUser);

        logVoteInfo("VOTE RESULT", gameCode, turn);
        return VoteResultDataDTO.builder().userSeq(mostVotedTargetUserSeq).politicianSeq(null).build();
    }

    private List<VoteResultDTO> createVoteResultDTOList(Map<Long, Integer> voteCountMap) {
        List<VoteResultDTO> voteResultDTOList = new ArrayList<>();
        for (Long userSeq : voteCountMap.keySet()) {
            voteResultDTOList.add(VoteResultDTO.builder().userSeq(userSeq).cnt(voteCountMap.get(userSeq)).build());
        }

        return voteResultDTOList;
    }

    private void logVoteFail(VoteDTO voteDTO) {
        logVoteInfo("VOTE FAIL (CAN'T VOTE)", voteDTO);
    }

    private void logVoteSuccess(VoteDTO voteDTO) {
        logVoteInfo("VOTE SUCCESS", voteDTO);
        log.info("TARGET USER: " + voteDTO.getTargetUserSeq());
    }

    private void logVoteInfo(String message, VoteDTO voteDTO) {
        log.info("====================================");
        log.info(message);
        log.info("GAME: " + voteDTO.getGameCode());
        log.info("TURN: " + voteDTO.getTurn());
        log.info("VOTE USER: " + voteDTO.getUserSeq());
        log.info("====================================");
    }

    private void logVoteInfo(String message, String gameCode, int turn) {
        log.info("====================================");
        log.info(message);
        log.info("ROOM: " + gameCode);
        log.info("TURN: " + turn);
        log.info("====================================");
    }
}
