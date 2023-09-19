package com.chibbol.wtz.domain.job.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExcludeJobDTO {
    private String gameCode;
    private Long roomSeq;
    private Long jobSeq;
}
