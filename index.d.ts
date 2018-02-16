declare namespace Cryptium {
    export function encryptNotification(
        destination:string, 
        content:string, 
        pub:string
     ): any;
     export function decryptNotification(
         destination:string,
         content:string,
         iv:string,
         priv:string
    ): any;
 }

declare module "cryptium" {
    export = Cryptium;
}