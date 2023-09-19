package com.chibbol.wtz.domain.room.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Map;

@Setter
@Getter
@ToString
public class JobSettingDTO {
    private Map<String, Boolean> jobSetting;
}
