package com.chibbol.wtz.domain.shop.repository;

import com.chibbol.wtz.domain.shop.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findAllByType(String type);

    Item findByItemSeq(Long itemSeq);
}
