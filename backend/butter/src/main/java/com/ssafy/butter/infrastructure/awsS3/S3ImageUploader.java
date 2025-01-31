package com.ssafy.butter.infrastructure.awsS3;

import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;
import java.util.UUID;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;


@Slf4j
@Service
public class S3ImageUploader implements ImageUploader{
    private final S3Client s3Client;
    private final String bucketName;
    private final String region;

    public S3ImageUploader(S3Client s3Client, @Value("${cloud.aws.s3.bucket}") String bucketName, @Value("${cloud.aws.region.static}") String region){
        this.s3Client = s3Client;
        this.bucketName = bucketName;
        this.region = region;
    }

    @Override
    public String uploadImage(MultipartFile file) {
        String key = createFileKey(Objects.requireNonNull(file.getOriginalFilename()));

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType(file.getContentType())
                .contentDisposition("inline")
                .build();

        try (InputStream inputStream = file.getInputStream()) {
            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(inputStream, file.getSize()));
        } catch (IOException e) {
            log.error("파일 업로드 중 오류 발생", e);
            throw new RuntimeException("ERR : 파일 업로드 실패", e);
        }

        return getS3FileUrl(key);
    }


    private String getS3FileUrl(String key) {
        return String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, region, key);
    }

    private String createFileKey(String originalFilename){
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        return UUID.randomUUID()+extension;
    }
}
