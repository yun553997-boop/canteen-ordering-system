package com.canteen.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import com.canteen.common.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1/common")
public class UploadController {

    @Value("${canteen.upload-path}")
    private String uploadPath;

    @SaCheckLogin
    @PostMapping("/upload")
    public R<Map<String, String>> upload(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return R.fail("请选择文件");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            return R.fail("只允许上传图片文件");
        }

        String originalName = file.getOriginalFilename();
        String ext = "";
        if (originalName != null && originalName.contains(".")) {
            ext = originalName.substring(originalName.lastIndexOf("."));
        }
        String filename = UUID.randomUUID().toString() + ext;

        try {
            File dir = new File(uploadPath, "dishes");
            if (!dir.exists()) {
                dir.mkdirs();
            }
            File dest = new File(dir, filename);
            file.transferTo(dest);

            String url = "/uploads/dishes/" + filename;
            log.info("[Upload] 图片上传成功: {} -> {}", dest.getAbsolutePath(), url);

            Map<String, String> result = new HashMap<>();
            result.put("url", url);
            return R.ok(result);
        } catch (IOException e) {
            log.error("[Upload] 上传失败", e);
            return R.fail("上传失败: " + e.getMessage());
        }
    }
}
