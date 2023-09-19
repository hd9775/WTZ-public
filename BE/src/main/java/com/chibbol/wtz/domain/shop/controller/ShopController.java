package com.chibbol.wtz.domain.shop.controller;

import com.chibbol.wtz.domain.shop.dto.BuyItemListDTO;
import com.chibbol.wtz.domain.shop.dto.ItemDTO;
import com.chibbol.wtz.domain.shop.dto.ItemListDTO;
import com.chibbol.wtz.domain.shop.service.ShopService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/shop")
public class ShopController {

    private final ShopService shopService;

    @Operation(summary = "아이템 목록 조회")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이템 목록 조회 성공")
    })
    @GetMapping("/{itemType}")
    public ResponseEntity<List<ItemDTO>> getItems(@PathVariable String itemType) {
        List<ItemDTO> itemList = shopService.getItems(itemType);
        return ResponseEntity.ok(itemList);
    }

    @Operation(summary = "아이템 구매")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이템 구매 성공"),
            @ApiResponse(responseCode = "403", description = "Insufficient Points"),
            @ApiResponse(responseCode = "403", description = "Already Purchased"),
            @ApiResponse(responseCode = "404", description = "유저를 찾을 수 없습니다.")
    })
    @PostMapping("/buy")
    public ResponseEntity<Void> buyItem(@RequestBody BuyItemListDTO buyItemListDto) {
        shopService.buyItem(buyItemListDto);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "장착중인 아이템 목록")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "장착중인 아이템 목록 조회 성공"),
            @ApiResponse(responseCode = "404", description = "유저를 찾을 수 없습니다.")
    })
    @GetMapping("/equipped")
    public ResponseEntity<List<ItemDTO>> getEquippedItems() {
        List<ItemDTO> equippedItemList = shopService.getEquippedItems();
        return ResponseEntity.ok(equippedItemList);
    }

    @Operation(summary = "아이템 장착")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "아이템 장착 성공"),
            @ApiResponse(responseCode = "404", description = "유저를 찾을 수 없습니다.")
    })
    @PatchMapping("/equipped")
    public ResponseEntity<Void> equipItem(@RequestBody ItemListDTO equippedItemListDto) {
        shopService.equipItem(equippedItemListDto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/gif")
    public ResponseEntity<ItemDTO> getGif(@RequestParam String itemName) {
        ItemDTO itemDTO = shopService.getGif(itemName);
        return ResponseEntity.ok(itemDTO);
    }

    @Operation(summary = "아이템 추가(관리자용)")
    @PostMapping("/")
    public ResponseEntity<Void> addItem() {
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "포인트 추가(관리자용)")
    @PatchMapping("/point")
    public ResponseEntity<Void> addPoint(@RequestParam Long userSeq, @RequestParam Integer point) {
        shopService.addPoint(userSeq, point);
        return ResponseEntity.ok().build();
    }
}
