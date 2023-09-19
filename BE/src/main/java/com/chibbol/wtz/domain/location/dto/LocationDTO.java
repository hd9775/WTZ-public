package com.chibbol.wtz.domain.location.dto;

import lombok.*;
import org.springframework.stereotype.Service;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class LocationDTO {
    private Long orderNumber;
    private Double xaxis1;
    private Double yaxis1;
    private Double xaxis2;
    private Double yaxis2;
}
