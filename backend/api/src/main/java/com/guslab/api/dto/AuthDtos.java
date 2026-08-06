package com.guslab.api.dto;

import lombok.Data;
import java.util.Set;

public class AuthDtos {
    @Data
    public static class LoginRequest {
        private String username;
        private String password;
    }

    @Data
    public static class SignupRequest {
        private String username;
        private String email;
        private String password;
        private Set<String> roles;
    }

    @Data
    public static class JwtResponse {
        private String token;
        private String type = "Bearer";
        private String username;
        private String email;
        private Set<String> roles;

        public JwtResponse(String token, String username, String email, Set<String> roles) {
            this.token = token;
            this.username = username;
            this.email = email;
            this.roles = roles;
        }
    }
}
