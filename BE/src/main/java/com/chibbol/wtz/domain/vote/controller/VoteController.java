package com.chibbol.wtz.domain.vote.controller;

import com.chibbol.wtz.domain.vote.dto.VoteDTO;
import com.chibbol.wtz.domain.vote.service.VoteService;
import com.chibbol.wtz.global.timer.dto.VoteResultDataDTO;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/vote")
@RequiredArgsConstructor
public class VoteController {
    private final VoteService voteService;

    @Operation(summary = "투표하기")
    @PostMapping("/")
    public void vote(@RequestBody VoteDTO voteDTO) {
        voteService.vote(voteDTO);
    }

    @Operation(summary = "투표 결과")
    @GetMapping("/")
    public ResponseEntity<VoteResultDataDTO> voteResult(@RequestParam String gameCode, @RequestParam int turn) {
        VoteResultDataDTO result = voteService.voteResult(gameCode, turn);
        return ResponseEntity.ok(result);
    }
}
