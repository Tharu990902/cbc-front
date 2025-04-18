import { createClient } from "@supabase/supabase-js";
const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1YXhkdW1nZ3l2eWJvaG92bnJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNTM2MTAsImV4cCI6MjA1OTkyOTYxMH0.f6STyvo4u6N7fErV7Vd28fs_zgooiB3PXtBTCezbfSM`

const url = "https://uuaxdumggyvybohovnrs.supabase.co"

export default function Uploadfile(file){

    // upload any file in to the superbase
    return new Promise((resolve, reject) => {
        
        if(file == null){
           reject("Please select a file to upload.");
        }


        let fileName = file.name;
        const fileExtention = fileName.split(".")[fileName.split(".").length - 1];

        if(fileExtention != "png" && fileExtention != "jpg" && fileExtention != "jpeg"){
            reject("Please select a valid file type (png, jpg, jpeg).")
        }

        const superbase = createClient(url, key);
        const timstamp = new Date().getTime();

        fileName = timstamp+"."+ fileExtention;

        superbase.storage.from("images").upload(fileName, file, {
            cacheControl: "3600",
            upsert: false
        }).then(()=>{

            const url2 = superbase.storage.from("images").getPublicUrl(fileName).data.publicUrl
            resolve(url2)

        }).catch((error) => {
            reject(error.message)
        })

    })

}

