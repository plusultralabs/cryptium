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
    ): Promise<Encrypted>;
    export function decryptDestination(
        destination:string,
        priv:string
    ): Promise<string>;
     export function decryptNotification(
         destination:string,
         content:string,
         iv:string,
         priv:string
    ): Promise<Decrypted>;
 }

declare module "cryptium" {
    export = Cryptium;
}