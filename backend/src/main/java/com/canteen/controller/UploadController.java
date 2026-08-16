package com.canteen.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import com.canteen.common.R;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
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

    /**
     * 生成二维码图片（用于取餐码展示）
     * 返回 PNG 图片流，跨端直接 <image> 展示
     * 公开访问：<image> 标签无法携带 token header，且二维码内容仅为订单号，不敏感
     */
    @GetMapping("/qrcode")
    public void qrcode(@RequestParam String text, HttpServletResponse response) {
        try {
            if (text == null || text.isEmpty()) {
                response.setStatus(400);
                return;
            }
            int size = 300;
            BitMatrix matrix = new MultiFormatWriter().encode(text, BarcodeFormat.QR_CODE, size, size);
            BufferedImage image = MatrixToImageWriter.toBufferedImage(matrix);
            response.setContentType("image/png");
            ImageIO.write(image, "png", response.getOutputStream());
        } catch (Exception e) {
            log.error("[QRCode] 生成失败", e);
            response.setStatus(500);
        }
    }

    @SaCheckLogin
    @PostMapping("/upload")
    public R<Map<String, String>> upload(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return R.fail("请选择文件");
        }

        String originalName = file.getOriginalFilename();
        String ext = "";
        if (originalName != null && originalName.contains(".")) {
            ext = originalName.substring(originalName.lastIndexOf(".")).toLowerCase();
        }
        // 小程序上传时 Content-Type 常为 application/octet-stream，改用扩展名 + Content-Type 双重校验
        String contentType = file.getContentType();
        boolean extValid = ext.matches("\\.(jpg|jpeg|png|gif|webp|bmp)");
        boolean contentTypeValid = contentType != null && contentType.startsWith("image/");
        if (!extValid && !contentTypeValid) {
            return R.fail("只允许上传图片文件");
        }

        String filename = UUID.randomUUID().toString() + ext;

        try {
            File dir = new File(uploadPath, "dishes");
            if (!dir.exists() && !dir.mkdirs()) {
                return R.fail("创建上传目录失败: " + dir.getAbsolutePath());
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
