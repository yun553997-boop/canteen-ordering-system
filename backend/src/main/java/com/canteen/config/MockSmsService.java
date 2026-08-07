package com.canteen.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
@ConditionalOnProperty(name = "system.is-mock-sms", havingValue = "true")
public class MockSmsService {

    private final StringRedisTemplate stringRedisTemplate;

    private static final String SMS_CODE_PREFIX = "sms:code:";
    private static final long SMS_CODE_TTL = 5;
    private static final Random RANDOM = new Random();

    public void sendCode(String phone) {
        String code = String.format("%06d", RANDOM.nextInt(1000000));
        String key = SMS_CODE_PREFIX + phone;

        stringRedisTemplate.opsForValue().set(key, code, SMS_CODE_TTL, TimeUnit.MINUTES);

        log.info("========================================");
        log.info("[Mock SMS] 验证码已发送到手机: {}", phone);
        log.info("[Mock SMS] 验证码: {}", code);
        log.info("[Mock SMS] 有效期: {} 分钟", SMS_CODE_TTL);
        log.info("========================================");
    }
}
