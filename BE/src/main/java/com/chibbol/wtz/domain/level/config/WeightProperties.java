package com.chibbol.wtz.domain.level.config;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.Map;

@Slf4j
@Component
@Getter
@Setter
@PropertySource("classpath:application-level.properties")
@ConfigurationProperties(prefix = "level.job")
public class WeightProperties {
    private Map<String, Integer> seq;
    private Map<String, Double> weight;
    private Double win;
    private Double ability;

//    @PostConstruct
//    public void init(){
//        log.info(seq.toString());
//        log.info(weight.toString());
//        log.info(win.toString());
//        log.info(ability.toString());
//    }
}
