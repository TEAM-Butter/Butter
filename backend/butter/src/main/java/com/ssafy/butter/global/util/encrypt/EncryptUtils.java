package com.ssafy.butter.global.util.encrypt;

public interface EncryptUtils {

    String encrypt(String plain);
    boolean isMatch(String plain, String crypto);
}
