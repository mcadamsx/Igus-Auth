export interface AuthInterface {
    name: string;
    email: string;
    password: string;
    token: string;
    message: string

}
export interface responseInterface {
    message: string;
    resetToken: string;
    error: {
        message: string
    }
}
export interface updatePasswordInterface {
    newPassword: string;
    resetToken: string;
}
