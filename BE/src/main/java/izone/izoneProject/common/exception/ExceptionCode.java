package izone.izoneProject.common.exception;

import lombok.Getter;

public enum ExceptionCode {
    VOTE_ALLOW_NOT(405, "USER NOT FOUND");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
