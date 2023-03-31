package izone.izoneProject.common.exception;

import lombok.Getter;

public enum ExceptionCode {
    NO_PERMISSION_CREATING_POST(403, "회원만 작성 할 수 있습니다."),
    NO_PERMISSION_EDITING_POST(403, "작성자만 수정할 수 있습니다."),
    NO_PERMISSION_DELETING_POST(403, "작성자만 삭제할 수 있습니다."),
    USER_NOT_FOUND(404, "회원을 찾을 수 없습니다."),
    USER_ALREADY_EXISTS(409, "이미 등록된 이메일 입니다."),
    VOTE_ALLOW_NOT(405, "USER NOT FOUND");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message){
        this.status = status;
        this.message = message;
    }
}
