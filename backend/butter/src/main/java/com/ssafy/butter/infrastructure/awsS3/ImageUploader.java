package com.ssafy.butter.infrastructure.awsS3;

import org.springframework.web.multipart.MultipartFile;

public interface ImageUploader {
    String uploadImage(MultipartFile file);
}
