package com.chibbol.wtz.domain.shop.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ItemListDTO {
    private List<ItemDTO> items;
}
