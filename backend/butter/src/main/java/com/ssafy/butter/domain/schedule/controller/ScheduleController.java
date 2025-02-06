package com.ssafy.butter.domain.schedule.controller;

import com.ssafy.butter.auth.dto.AuthInfoDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleLikeRequestDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleCalendarRequestDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleSaveRequestDTO;
import com.ssafy.butter.domain.schedule.dto.request.ScheduleSearchRequestDTO;
import com.ssafy.butter.domain.schedule.dto.response.ScheduleResponseDTO;
import com.ssafy.butter.domain.schedule.service.ScheduleService;
import com.ssafy.butter.global.token.CurrentUser;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/schedule")
@Slf4j
@Tag(name = "Schedule API", description = "버스킹 일정 관련 API")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Operation(summary = "버스킹 일정 생성", description = "새로운 버스킹 일정을 생성합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "버스킹 일정 생성 성공")
    })
    @PostMapping
    public ResponseEntity<?> createSchedule(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser,
            @RequestBody ScheduleSaveRequestDTO scheduleSaveRequestDTO) {
        ScheduleResponseDTO scheduleResponseDTO = scheduleService.createSchedule(currentUser, scheduleSaveRequestDTO);
        return ResponseEntity.created(URI.create("/api/v1/schedule/detail/" + scheduleResponseDTO.id())).body(scheduleResponseDTO);
    }

    @Operation(summary = "버스킹 일정 검색", description = "버스킹 일정을 검색합니다.")
    @GetMapping
    public ResponseEntity<?> searchSchedule(
            @ParameterObject @ModelAttribute ScheduleSearchRequestDTO scheduleSearchRequestDTO) {
        return ResponseEntity.ok(scheduleService.searchSchedule(scheduleSearchRequestDTO));
    }

    @Operation(summary = "달력 버스킹 일정 조회", description = "달력의 버스킹 일정을 조회합니다.")
    @GetMapping("/calendar-list")
    public ResponseEntity<?> getScheduleCalendarList(
            @ParameterObject @ModelAttribute ScheduleCalendarRequestDTO scheduleCalendarRequestDTO) {
        return ResponseEntity.ok(scheduleService.getScheduleCalendarList(scheduleCalendarRequestDTO));
    }

    @Operation(summary = "버스킹 일정 상세 조회", description = "특정 버스킹 일정의 상세 정보를 조회합니다.")
    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getScheduleDetail(@PathVariable Long id) {
        return ResponseEntity.ok(scheduleService.getScheduleDetail(id));
    }

    @Operation(summary = "버스킹 일정 수정", description = "기존 버스킹 일정의 정보를 수정합니다.")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSchedule(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser,
            @PathVariable Long id, @RequestBody ScheduleSaveRequestDTO scheduleSaveRequestDTO) {
        return ResponseEntity.ok(scheduleService.updateSchedule(currentUser, id, scheduleSaveRequestDTO));
    }

    @Operation(summary = "버스킹 일정 삭제", description = "특정 버스킹 일정을 삭제합니다.")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSchedule(
            @Parameter(hidden = true) @CurrentUser AuthInfoDTO currentUser, @PathVariable Long id) {
        return ResponseEntity.ok(scheduleService.deleteSchedule(currentUser, id));
    }

    @Operation(summary = "버스킹 일정 좋아요 등록", description = "버스킹 일정 좋아요를 등록합니다.")
    @PostMapping("/like")
    public ResponseEntity<?> likeSchedule(@RequestBody ScheduleLikeRequestDTO scheduleLikeRequestDTO) {
        scheduleService.likeSchedule(1L, scheduleLikeRequestDTO);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "버스킹 일정 좋아요 해제", description = "버스킹 일정 좋아요를 해제합니다.")
    @DeleteMapping("/like/{id}")
    public ResponseEntity<?> unlikeSchedule(@PathVariable Long id) {
        scheduleService.unlikeSchedule(1L, id);
        return ResponseEntity.noContent().build();
    }
}
