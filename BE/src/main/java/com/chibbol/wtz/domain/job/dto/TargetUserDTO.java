package com.chibbol.wtz.domain.job.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class TargetUserDTO {
    Long userSeq;
    Long targetUserSeq;
}
