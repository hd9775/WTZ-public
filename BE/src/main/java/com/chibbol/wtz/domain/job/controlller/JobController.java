//package com.chibbol.wtz.domain.job.controlller;
//
//import com.chibbol.wtz.domain.job.dto.ExcludeJobDTO;
//import com.chibbol.wtz.domain.job.dto.JobDTO;
//import com.chibbol.wtz.domain.job.dto.UserAbilityRecordDTO;
//import com.chibbol.wtz.domain.job.dto.UserJobListDTO;
//import com.chibbol.wtz.domain.job.entity.Job;
//import com.chibbol.wtz.domain.job.entity.RoomUserJob;
//import com.chibbol.wtz.domain.job.entity.UserAbilityRecord;
//import com.chibbol.wtz.domain.job.repository.JobRepository;
//import com.chibbol.wtz.domain.job.repository.RoomUserJobRedisRepository;
//import com.chibbol.wtz.domain.job.repository.UserAbilityRecordRedisRepository;
//import com.chibbol.wtz.domain.job.service.JobService;
//import io.swagger.v3.oas.annotations.Operation;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@RestController
//@RequestMapping("/api/v1/job")
//@RequiredArgsConstructor
//public class JobController {
//
//    private final JobRepository jobRepository;
//    private final RoomUserJobRedisRepository roomUserJobRedisRepository;
//    private final JobService jobService;
//    private final UserAbilityRecordRedisRepository userAbilityRecordRepository;
//
//    @Operation(summary = "직업생성 (관리자 전용)")
//    @PostMapping("/make")
//    public ResponseEntity<Void> makeJob(@RequestBody JobDTO jobDTO) {
//        jobRepository.save(Job.builder()
//                .name(jobDTO.getName())
//                .description(jobDTO.getDescription())
//                .build());
//        return ResponseEntity.ok().build();
//    }
//
//    @Operation(summary = "게임 시작할때 roomSeq방에 참여한 인원들에게 랜덤으로 직업 부여")
//    @PostMapping("/randomJob/{roomSeq}")
//    public ResponseEntity<Void> randomJobInRoomUser(@PathVariable Long roomSeq) {
//        jobService.randomJobInRoomUser(roomSeq);
//        return ResponseEntity.ok().build();
//    }
//
//    @Operation(summary = "능력 사용 정보")
//    @PostMapping("/ability")
//    public ResponseEntity<Void> recordAbility(@RequestBody UserAbilityRecordDTO userAbilityDto) {
//        userAbilityRecordRepository.save(UserAbilityRecord.builder()
//                .roomSeq(userAbilityDto.getRoomSeq())
//                .turn(userAbilityDto.getTurn())
//                .userSeq(userAbilityDto.getUserSeq())
//                .targetUserSeq(userAbilityDto.getTargetUserSeq())
//                .build());
//
//        return ResponseEntity.ok().build();
//    }
//
//    // 테스트용
//    @GetMapping("/{roomSeq}")
//    public ResponseEntity<List<UserJobListDTO>> getAbility(@PathVariable Long roomSeq) {
//        List<RoomUserJob> list = roomUserJobRedisRepository.findAllByRoomSeq(roomSeq);
//        List<UserJobListDTO> jobList = list.stream()
//                .map(userJob -> new UserJobListDTO().toUserJobListDTO(userJob))
//                .collect(Collectors.toList());
//        return ResponseEntity.ok(jobList);
//    }
//
//    @Operation(summary = "밤이 끝났을때 해당 턴에 사용한 능력들의 결과")
//    @GetMapping("/result/{roomSeq}/{turn}")
//    public ResponseEntity<List<UserAbilityRecord>> getAbilityResult(@PathVariable Long roomSeq, @PathVariable Long turn) {
//        List<UserAbilityRecord> list = jobService.useAbilityNight(roomSeq, turn);
//        return ResponseEntity.ok(list);
//    }
//
//
//    // 테스트용
//    @PostMapping("/set")
//    public ResponseEntity<Void> setUserAbilityRecord() {
//
//        userAbilityRecordRepository.save(UserAbilityRecord.builder().roomSeq((long)3).turn((long)1).userSeq((long)1).targetUserSeq((long)6).build());
//        userAbilityRecordRepository.save(UserAbilityRecord.builder().roomSeq((long)3).turn((long)1).userSeq((long)2).targetUserSeq((long)3).build());
//        userAbilityRecordRepository.save(UserAbilityRecord.builder().roomSeq((long)3).turn((long)1).userSeq((long)3).targetUserSeq((long)1).build());
//        userAbilityRecordRepository.save(UserAbilityRecord.builder().roomSeq((long)3).turn((long)1).userSeq((long)4).targetUserSeq((long)1).build());
//        userAbilityRecordRepository.save(UserAbilityRecord.builder().roomSeq((long)3).turn((long)1).userSeq((long)5).targetUserSeq((long)1).build());
//        userAbilityRecordRepository.save(UserAbilityRecord.builder().roomSeq((long)3).turn((long)1).userSeq((long)6).targetUserSeq((long)1).build());
//
//        return ResponseEntity.ok().build();
//    }
//
//    @Operation(summary = "대기방에서 직업 선택 (방장) 토글로 적용, 사용x설정 -> result=true, 사용o설정 -> result=false")
//    @PatchMapping("/excludeJobSeq")
//    public void toggleExcludeJobSeq(@RequestBody ExcludeJobDTO excludeJobDTO) {
//        jobService.toggleExcludeJobSeq(excludeJobDTO);
//    }
//}
