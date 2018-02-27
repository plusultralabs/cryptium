declare namespace Cryptium {
    interface Encrypted {
        iv : string,
        content : string,
        destination : string
    }
    interface Decrypted {
        content : string,
        destination : string
    }
    export function encryptNotification(
        destination:string, 
        content:string, 
        pub:string
     ): Encrypted;
     export function decryptNotification(
         destination:string,
         content:string,
         iv:string,
         priv:string
    ): Decrypted;
 }

declare module "cryptium" {
    export = Cryptium;
}