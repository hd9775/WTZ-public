package com.chibbol.wtz.domain.room.dto;

import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class CurrentSeatsDTOList {
    private List<CurrentSeatsDTO> curSeats;

    @Builder
    public CurrentSeatsDTOList(List<CurrentSeatsDTO> curSeats) {
        this.curSeats = curSeats;
    }

    public String toString() {
        String seatsString = curSeats.stream()
                .map(CurrentSeatsDTO::toString)
                .collect(Collectors.joining(", ", "[", "]"));

        return "CurrentSeatsDTOList{" +
                "curSeats=" + seatsString +
                '}';
    }
}
