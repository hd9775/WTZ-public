package com.chibbol.wtz.domain.room.dto;

import lombok.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomSettingDTO {
    private String title;
    private Long ownerSeq;
    private Map<Long, Boolean> jobSetting;
    private List<CurrentSeatsDTO> curSeats;
    private String message;

    public String toString() {
        String seatsString = curSeats.stream()
                .map(CurrentSeatsDTO::toString)
                .collect(Collectors.joining(", ", "[", "]"));

        return "RoomSettingDTO{" +
                "title='" + title +
                ", ownerSeq=" + ownerSeq +
                ", jobSetting=" + jobSetting +
                ", curSeats=" + seatsString +
                ", message='" + message +
                '}';
    }
}
