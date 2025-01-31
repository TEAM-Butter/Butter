package com.ssafy.butter.global.util.encrypt;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Component;

@Component
public class Encryptor implements EncryptUtils {

    @Override
    public String encrypt(String plain) {
        return BCrypt.hashpw(plain, BCrypt.gensalt());
    }

    @Override
    public boolean isMatch(String plain, String crypto) {
        return BCrypt.checkpw(plain, crypto);
    }
}
